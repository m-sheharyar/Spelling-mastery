from django.db import models
from django.http import request
from django.core.exceptions import ValidationError
import nltk
from nltk.corpus import brown, gutenberg, reuters, webtext, inaugural, state_union, cmudict


from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver

class Puzzle(models.Model):
    characters = models.CharField(max_length=6, unique=True)
    central_letter = models.CharField(max_length=1 )

    def __str__(self):
        return self.characters
    
    def clean(self):
        if not self.is_valid_puzzle():
            raise ValidationError("No valid answer found for this puzzle. Please check the characters.")
        

    def is_valid_puzzle(self):
        # Access words from NLTK corpora
        brown_words = set(brown.words())
        gutenberg_words = set(gutenberg.words())
        reuters_words = set(reuters.words())
        webtext_words = set(webtext.words())
        inaugural_words = set(inaugural.words())
        state_union_words = set(state_union.words())

        # Combine words into a single set to remove duplicates efficiently
        combined_words = (
            brown_words |
            gutenberg_words |
            reuters_words |
            webtext_words |
            inaugural_words |
            state_union_words
        )

        # Define the criteria for filtering words
        def is_valid_word(word):
            word_set = set(word)
            return (self.central_letter in word_set and 
                    set(word).issubset(set(self.characters + self.central_letter)) and 
                    len(word) >= 4 and 
                    word.isalpha() and 
                    word.islower())

        # Filter and remove duplicates
        valid_words = {word.lower() for word in combined_words if is_valid_word(word.lower())}

        # Validate each word against the cmudict corpus
        cmudict_words = set(cmudict.words())
        filtered_valid_words = [word for word in valid_words if word in cmudict_words]

        return bool(filtered_valid_words)


# Signal to delete previous answers before saving an updated Puzzle
@receiver(pre_save, sender=Puzzle)
def delete_previous_answers(sender, instance, **kwargs):
    if instance.pk:
        # Fetch previous answers related to the puzzle instance being updated
        previous_answers = Answer.objects.filter(puzzle=instance)
        
        # Delete previous answers
        previous_answers.delete()


class Answer(models.Model):
    word = models.CharField(max_length=100)
    puzzle = models.ForeignKey(Puzzle, related_name='answers', on_delete=models.CASCADE)

    def __str__(self):
        return self.word
    