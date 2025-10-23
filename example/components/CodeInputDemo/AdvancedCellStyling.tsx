import React from 'react'
import { Text, View } from 'react-native'
import { CodeInput } from 'rn-base-component'
import { demoStyles, customCellStyles } from './styles'

export const AdvancedCellStyling = () => {
  return (
    <View style={demoStyles.section}>
      <Text style={demoStyles.sectionTitle}>🎨 Advanced Cell Styling</Text>
      <Text style={demoStyles.sectionDescription}>
        Explore different visual styles for code input cells
      </Text>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Circular Cells</Text>
        <CodeInput
          length={4}
          label="Rounded Style"
          cellStyle={customCellStyles.circularCell}
          focusCellStyle={customCellStyles.circularFocusCell}
          filledCellStyle={customCellStyles.circularFilledCell}
          textStyle={customCellStyles.circularText}
          helperText="Fully rounded circular cells"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Square/Sharp Cells</Text>
        <CodeInput
          length={4}
          label="Sharp Corners"
          cellStyle={customCellStyles.squareCell}
          focusCellStyle={customCellStyles.squareFocusCell}
          textStyle={customCellStyles.squareText}
          helperText="No border radius, sharp edges"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Gradient Background</Text>
        <CodeInput
          length={5}
          label="Colorful Cells"
          cellStyle={customCellStyles.gradientCell}
          focusCellStyle={customCellStyles.gradientFocusCell}
          filledCellStyle={customCellStyles.gradientFilledCell}
          textStyle={customCellStyles.gradientText}
          helperText="Colored backgrounds with gradient feel"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Large Size Variant</Text>
        <CodeInput
          length={4}
          label="Large Cells"
          cellStyle={customCellStyles.largeCell}
          focusCellStyle={customCellStyles.largeFocusCell}
          textStyle={customCellStyles.largeText}
          helperText="Bigger cells for better visibility"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Small/Compact Size</Text>
        <CodeInput
          length={6}
          label="Compact Cells"
          cellStyle={customCellStyles.smallCell}
          focusCellStyle={customCellStyles.smallFocusCell}
          textStyle={customCellStyles.smallText}
          helperText="Smaller cells for space-efficient layout"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Elevated with Shadow</Text>
        <CodeInput
          length={4}
          label="Shadow Effect"
          cellStyle={customCellStyles.shadowCell}
          focusCellStyle={customCellStyles.shadowFocusCell}
          textStyle={customCellStyles.shadowText}
          helperText="Cells with shadow for depth effect"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Outlined Style</Text>
        <CodeInput
          length={4}
          label="Thick Borders"
          cellStyle={customCellStyles.outlinedCell}
          focusCellStyle={customCellStyles.outlinedFocusCell}
          filledCellStyle={customCellStyles.outlinedFilledCell}
          textStyle={customCellStyles.outlinedText}
          helperText="Thick borders with transparent background"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Filled Style</Text>
        <CodeInput
          length={5}
          label="Solid Background"
          cellStyle={customCellStyles.filledCell}
          focusCellStyle={customCellStyles.filledFocusCell}
          filledCellStyle={customCellStyles.filledFilledCell}
          textStyle={customCellStyles.filledText}
          helperText="Solid backgrounds with subtle borders"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Minimalist Style</Text>
        <CodeInput
          length={6}
          label="Clean & Minimal"
          cellStyle={customCellStyles.minimalistCell}
          focusCellStyle={customCellStyles.minimalistFocusCell}
          textStyle={customCellStyles.minimalistText}
          helperText="Clean, thin borders with light colors"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Bold/Heavy Style</Text>
        <CodeInput
          length={4}
          label="Bold & Strong"
          cellStyle={customCellStyles.boldCell}
          focusCellStyle={customCellStyles.boldFocusCell}
          filledCellStyle={customCellStyles.boldFilledCell}
          textStyle={customCellStyles.boldText}
          helperText="Thick borders with bold, strong appearance"
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Custom Error State</Text>
        <CodeInput
          length={4}
          label="Custom Validation"
          value="12"
          error
          errorText="Custom red styling for errors"
          cellStyle={customCellStyles.validationCell}
          errorCellStyle={customCellStyles.customErrorCell}
          textStyle={customCellStyles.validationText}
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Custom Success State</Text>
        <CodeInput
          length={4}
          label="Custom Success"
          value="1234"
          success
          helperText="Custom green styling for success"
          cellStyle={customCellStyles.validationCell}
          successCellStyle={customCellStyles.customSuccessCell}
          textStyle={customCellStyles.validationText}
        />
      </View>

      <View style={demoStyles.example}>
        <Text style={demoStyles.exampleTitle}>Light Subtle Style (Figma Design)</Text>
        <CodeInput
          length={6}
          label="Light & Subtle"
          cellStyle={customCellStyles.figmaLightCell}
          focusCellStyle={customCellStyles.figmaLightFocusCell}
          filledCellStyle={customCellStyles.figmaLightFilledCell}
          textStyle={customCellStyles.figmaLightText}
          helperText="Light background with subtle 0.5px border"
        />
      </View>
    </View>
  )
}
