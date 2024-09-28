from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'age', 'email', 'password','gender', 'phone_number']  # Include all necessary fields
        extra_kwargs = {
            'password': {'write_only': True},  # Ensure password is write-only
            'email': {'required': True}  # Make email required if it's not set as such in the model
        }

    def create(self, validated_data):
        # Extract the password from the validated data
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # Create a User instance
        
        # Set the password using the set_password method to hash it
        if password is not None:
            instance.set_password(password)
        
        instance.save()  # Save the instance to the database
        return instance
