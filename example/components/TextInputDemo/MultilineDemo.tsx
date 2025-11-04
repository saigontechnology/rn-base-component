import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'rn-base-component'
import { demoStyles } from './styles'

export const MultilineDemo = () => {
  const [comment, setComment] = useState('')
  const [description, setDescription] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>📝 Multiline TextInput</Text>
      <Text style={demoStyles.sectionDescription}>
        TextInput configured for multi-line text input
      </Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Basic Multiline Input</Text>
        <TextInput
          label="Comments"
          placeholder="Enter your comments here..."
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={3}
        />
        <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          Characters: {comment.length}
        </Text>
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Description Field</Text>
        <TextInput
          label="Product Description"
          placeholder="Describe the product in detail..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={demoStyles.multilineContainer}
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Notes with Character Limit</Text>
        <TextInput
          label="Additional Notes"
          placeholder="Any additional notes or remarks..."
          value={notes}
          onChangeText={(text) => {
            if (text.length <= 200) {
              setNotes(text)
            }
          }}
          multiline
          numberOfLines={3}
          errorText={
            notes.length > 200 ? 'Maximum 200 characters allowed' : undefined
          }
        />
        <Text style={{
          fontSize: 12,
          color: notes.length > 180 ? '#ff6b6b' : '#666',
          marginTop: 4,
          textAlign: 'right'
        }}>
          {notes.length}/200
        </Text>
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Multiline with Variants</Text>
        <View style={{ gap: 16 }}>
          <TextInput.Outlined
            label="Outlined Multiline"
            placeholder="Outlined multiline input..."
            multiline
            numberOfLines={2}
          />

          <TextInput.Flat
            label="Flat Multiline"
            placeholder="Flat multiline input..."
            multiline
            numberOfLines={2}
          />
        </View>
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Auto-expanding Multiline</Text>
        <TextInput
          label="Feedback"
          placeholder="Share your feedback..."
          multiline
          // Let it auto-expand based on content
        />
      </View>
    </View>
  )
}
