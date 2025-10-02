# Mobile Theme Setup Guideline with Figma MCP

This document provides step-by-step instructions for setting up and synchronizing mobile theme variables from Figma designs using Figma MCP (Model Context Protocol).

## Prerequisites

- Figma MCP installed and configured in your development environment
- Access to the Figma design file with proper permissions
- Existing project structure with theme files:
  - `src/themes/colors.ts`
  - `src/themes/metrics.ts`
  - `src/themes/fonts.ts`
  - `src/themes/theme.ts`

## Overview

The theme setup process consists of three main steps:

1. **Extract variables** from Figma using MCP
2. **Transform and organize** variables into appropriate theme files
3. **Create design system rules** for consistent usage

---

## Step 1: Extract Variables from Figma

### 1.1 Get the Figma Node ID

Extract the node ID from your Figma URL:

```
URL Format: https://figma.com/design/:fileKey/:fileName?node-id=1-2
Node ID Format: 1:2 (replace dash with colon)

Example:
URL: https://www.figma.com/design/JfmuXTpcFBa0xj3JzwNtxx/Project?node-id=9-55163
Node ID: 9:55163
```

### 1.2 Run MCP Command

Use the Figma MCP `get_variable_defs` tool to extract all design variables:

```typescript
mcp_Figma_get_variable_defs({
  nodeId: '9:55163',
  clientLanguages: 'typescript',
  clientFrameworks: 'react',
})
```

### 1.3 Review Extracted Variables

The MCP will return variables in the following categories:

- **Colors**: Text, background, foreground, border, feedback colors, and color palettes
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Padding and margin values
- **Radius**: Border radius values
- **Icon Sizes**: Standard icon dimensions

Example output format:

```json
{
  "color/text/text-primary": "#hexValue",
  "typography/font-size/text/md": "number",
  "spacing/8": "number",
  "radius/8": "number",
  "icon-size/24": "number"
}
```

**Note:** The actual values will depend on your Figma design system.

---

## Step 2: Transform and Organize Variables

### 2.1 COLORS - Update `src/themes/colors.ts`

#### 2.1.1 Naming Convention Rules

**MANDATORY RULES:**

- ✅ Use **camelCase** for all color names
- ✅ Remove special characters (slashes, hyphens)
- ✅ Convert hierarchical structure to meaningful names

**Transformation Examples:**

```typescript
// Figma Variable → Code Variable Name
"color/text/text-primary_on-brand" → textPrimaryOnBrand
"color/background/bg-primary" → bgPrimary
"color/border/border-secondary" → borderSecondary
"color/feedback/text/error" → feedbackTextError
```

#### 2.1.2 Color Structure

**Transformation Pattern:**

```
color/category/name             →  colors.category.name
color/category/subcategory/name →  colors.category.subcategory.name
```

**Template Structure:**

```typescript
const colors = {
  // Direct colors
  primary: '#hexValue',

  // Nested categories
  text: {
    primary: '#hexValue',
    secondary: '#hexValue',
  },

  background: {
    primary: '#hexValue',
  },

  feedback: {
    success: {
      text: '#hexValue',
    },
    error: {
      text: '#hexValue',
    },
  },

  // Legacy colors (if existing)
  light: { ... },
  dark: { ... },
} as const
```

**Implementation Steps:**

1. Run `get_variable_defs` to extract all Figma color variables
2. Identify hierarchy patterns in variable names
3. Create nested objects matching Figma structure
4. Convert names to camelCase (remove hyphens/underscores)
5. Replace `#hexValue` with actual Figma values

**Example Transformation:**

```typescript
// Figma Variables:
"color/text/text-primary": "#123456"
"color/background/bg-primary": "#ffffff"
"color/feedback/error/text": "#ff0000"

// Code Implementation:
const colors = {
  text: {
    primary: '#123456',
  },
  background: {
    primary: '#ffffff',
  },
  feedback: {
    error: {
      text: '#ff0000',
    },
  },
} as const
```

#### 2.1.3 Color Palette (Separate Constant)

**Purpose:** For colors with numeric scales (e.g., red/100, blue/500)

**Transformation Pattern:**

```
color/red/100            →  palette.red._100
color/blue/500           →  palette.blue._500
color/black/opacity/20   →  palette.black._20
```

**Template Structure:**

```typescript
const palette = {
  red: {
    _50: '#hexValue',
    _100: '#hexValue',
    _500: '#hexValue',
  },
  blue: {
    _300: '#hexValue',
  },
  black: {
    _20: '#hexValue',
  },
} as const
```

**Implementation Steps:**

1. Identify numeric patterns in Figma variables (`/50`, `/100`, `/500`)
2. Group by color name (all red shades together)
3. Use underscore prefix for numbers (`50` → `_50`)
4. Only include colors with multiple numeric variants

**Example Transformation:**

```typescript
// Figma Variables:
"color/red/100": "#ffcccc"
"color/red/500": "#ff0000"
"color/blue/300": "#6699ff"

// Code Implementation:
const palette = {
  red: {
    _100: '#ffcccc',
    _500: '#ff0000',
  },
  blue: {
    _300: '#6699ff',
  },
} as const
```

#### 2.1.4 Replace Existing Values

**IMPORTANT:** When a color name or meaning matches an existing color:

- ✅ **MUST replace** the existing value with the new value from Figma
- ✅ Maintain backward compatibility by keeping the property name

Example:

```typescript
// Before (existing in your project)
const colors = {
  primary: '#oldHexValue',
  error: '#oldHexValue',
}

// After (updated from Figma)
const colors = {
  primary: '#newFigmaValue', // ✅ Replaced with Figma value
  error: '#newFigmaValue', // ✅ Replaced with Figma value
}
```

#### 2.1.5 Utility Functions

Keep existing utility functions at the bottom:

```typescript
const getColorOpacity = (color: string, opacity: number): string => {
  if (opacity >= 0 && opacity <= 1 && color.includes('#')) {
    const hexValue = Math.round(opacity * 255).toString(16)
    return `${color.slice(0, 7)}${hexValue.padStart(2, '0').toUpperCase()}`
  }
  return color
}

export {colors, palette, getColorOpacity}
```

---

### 2.2 SPACING, RADIUS, ICON SIZE - Update `src/themes/metrics.ts`

#### 2.2.1 Naming Convention Rules

**MANDATORY RULES:**

- ✅ Use **camelCase** for all metric names
- ✅ Append the numeric value to the base name
- ✅ Use `responsiveHeight()` for spacing and radius
- ✅ Use `responsiveWidth()` or `responsiveHeight()` for icon sizes

**Transformation Examples:**

```typescript
// Figma Variable → Code Variable Name
"spacing/4" → spacing4: responsiveHeight(4)
"spacing/16" → spacing16: responsiveHeight(16)
"radius/8" → radius8: responsiveHeight(8)
"icon-size/24" → iconSize24: responsiveHeight(24)
```

#### 2.2.2 Metrics Structure

**Template Structure:**

```typescript
import {Dimensions, Platform} from 'react-native'

const DESIGN_WIDTH = 375
const DESIGN_HEIGHT = 812
const {width, height} = Dimensions.get('window')

function responsiveWidth<T extends number>(value: T) {
  return ((width * value) / DESIGN_WIDTH) as T
}

function responsiveHeight<T extends number>(value: T) {
  return ((height * value) / DESIGN_HEIGHT) as T
}

function responsiveFont<T extends number>(value: T) {
  return ((width * value) / DESIGN_WIDTH) as T
}

const metrics = {
  // Spacing from Figma
  spacing4: responsiveHeight(4),
  spacing8: responsiveHeight(8),
  spacing16: responsiveHeight(16),

  // Radius from Figma
  radius4: responsiveHeight(4),
  radius8: responsiveHeight(8),
  radiusRound: responsiveHeight(1000),

  // Icon sizes from Figma
  iconSize16: responsiveHeight(16),
  iconSize24: responsiveHeight(24),

  // Legacy values (keep existing)
  borderWidth: responsiveHeight(1),
  textInputHeight: responsiveHeight(44),
} as const
```

**Implementation Steps:**

1. Add Figma spacing values: `spacing/X` → `spacingX: responsiveHeight(X)`
2. Add Figma radius values: `radius/X` → `radiusX: responsiveHeight(X)`
3. Add Figma icon sizes: `icon-size/X` → `iconSizeX: responsiveHeight(X)`
4. Keep existing legacy values for backward compatibility

#### 2.2.3 Update Strategy

When updating metrics:

1. ✅ **Add new Figma values** with their exact names
2. ✅ **Keep legacy values** for backward compatibility
3. ✅ **Document equivalents** with comments (e.g., `// Same as spacing16`)
4. ✅ **Gradually migrate** old usage to new names in future refactoring

---

### 2.3 TYPOGRAPHY - Update `src/themes/metrics.ts`

#### 2.3.1 Font Sizes

**Template Structure:**

```typescript
const fontSizes = {
  xs: responsiveFont(12),
  sm: responsiveFont(14),
  md: responsiveFont(16),
  lg: responsiveFont(18),
  xl: responsiveFont(20),

  // Legacy values (keep existing)
  body: responsiveFont(16),
  title: responsiveFont(20),
} as const
```

#### 2.3.2 Font Weights

**Template Structure:**

```typescript
const fontWeights = {
  regular: '400',
  medium: '500',

  // Legacy values (keep existing)
  semiBold: '600',
  bold: '700',
} as const
```

#### 2.3.3 Font Families

**Update `src/themes/fonts.ts`:**

```typescript
const fonts = {
  regular: 'YourFont-Regular',
  medium: 'YourFont-Medium',
  bold: 'YourFont-Bold',
  family: 'YourFontFamily',
} as const

export {fonts}
```

#### 2.3.4 Line Heights (Optional)

**If needed:**

```typescript
const lineHeights = {
  xs: responsiveHeight(18),
  sm: responsiveHeight(20),
  md: responsiveHeight(22),
} as const
```

**Implementation Steps:**

1. Map Figma font sizes: `typography/font-size/text/md` → `fontSizes.md`
2. Map Figma font weights: `typography/font-weight/medium` → `fontWeights.medium`
3. Update font family names to match your actual fonts
4. Add line heights if your design system uses them

---

## Step 3: Create Design System Rules (Figma Theming and Styling)

### 3.1 Purpose of Design System Rules

The design system rules file acts as a **bridge** between Figma variables and your code implementation. When AI generates code from Figma designs using `get_code`, it needs to know how to translate Figma variable names to your actual theme tokens.

**Example Mapping:**

- Figma variable: `spacing/4` → Code: `metrics.spacing4`
- Figma variable: `color/text/text-primary` → Code: `colors.text.primary`
- Figma variable: `typography/font-size/text/md` → Code: `fontSizes.md`

**This file also includes:**

- ✅ Complete variable mapping tables (colors, spacing, radius, typography)
- ✅ Theming system rules (metrics reuse, platform detection)
- ✅ Styling constraints (no inline styles, no hardcoded values)
- ✅ Code generation rules and best practices
- ✅ Special patterns for feedback colors, opacity, rounded elements

### 3.2 Create Theming and Styling Rules File

Create a comprehensive rules file at `.cursor/rules/figma-theming-and-styling.mdc`:

**Template Structure:**

````markdown
# Figma Design System: Theming and Styling Rules

This document defines the complete design system integration between Figma designs and React Native code implementation, including variable mapping, theming rules, and styling constraints.

## Import Statements

```typescript
// ALWAYS include these imports when using theme tokens
import {colors, palette} from '@/themes/colors'
import {metrics, fontSizes, fontWeights} from '@/themes/metrics'
import {fonts} from '@/themes/fonts'
```
````

## 1. COLOR VARIABLE MAPPING

Create tables for EACH color category found in your Figma design:

### Example: Text Colors

| Figma Variable              | Code Implementation     | Hex Value |
| --------------------------- | ----------------------- | --------- |
| `color/text/text-primary`   | `colors.text.primary`   | #hexValue |
| `color/text/text-secondary` | `colors.text.secondary` | #hexValue |
| ...                         | ...                     | ...       |

### Example: Background Colors

| Figma Variable                  | Code Implementation           | Hex Value |
| ------------------------------- | ----------------------------- | --------- |
| `color/background/bg-primary`   | `colors.background.primary`   | #hexValue |
| `color/background/bg-secondary` | `colors.background.secondary` | #hexValue |
| ...                             | ...                           | ...       |

### Example: Border Colors

| Figma Variable                | Code Implementation     | Hex Value |
| ----------------------------- | ----------------------- | --------- |
| `color/border/border-primary` | `colors.border.primary` | #hexValue |
| ...                           | ...                     | ...       |

### Example: Feedback Colors

| Figma Variable                      | Code Implementation                  | Hex Value |
| ----------------------------------- | ------------------------------------ | --------- |
| `color/feedback/success/text`       | `colors.feedback.success.text`       | #hexValue |
| `color/feedback/success/background` | `colors.feedback.success.background` | #hexValue |
| `color/feedback/error/text`         | `colors.feedback.error.text`         | #hexValue |
| ...                                 | ...                                  | ...       |

### Example: Color Palette (Base Colors)

| Figma Variable   | Code Implementation | Hex Value |
| ---------------- | ------------------- | --------- |
| `color/red/50`   | `palette.red._50`   | #hexValue |
| `color/red/100`  | `palette.red._100`  | #hexValue |
| `color/blue/500` | `palette.blue._500` | #hexValue |
| ...              | ...                 | ...       |

**Instructions:**

- List ALL color variables from your Figma `get_variable_defs` output
- Group by category (text, background, border, feedback, etc.)
- Include the hex value for reference
- Adapt categories based on your actual Figma structure

## 2. SPACING VARIABLE MAPPING

| Figma Variable | Code Implementation | Value |
| -------------- | ------------------- | ----- |
| `spacing/4`    | `metrics.spacing4`  | 4px   |
| `spacing/8`    | `metrics.spacing8`  | 8px   |
| `spacing/16`   | `metrics.spacing16` | 16px  |
| ...            | ...                 | ...   |

**Instructions:**

- List ALL spacing values from Figma
- Format: `spacing/X` → `metrics.spacingX`
- Include pixel value for reference

**Usage Example:**

```typescript
// ❌ WRONG - Hardcoded
padding: 16,

// ✅ CORRECT - Using mapped token
import { metrics } from '@/themes/metrics'
padding: metrics.spacing16,  // From Figma spacing/16
```

## 3. RADIUS VARIABLE MAPPING

| Figma Variable | Code Implementation | Value |
| -------------- | ------------------- | ----- |
| `radius/4`     | `metrics.radius4`   | 4px   |
| `radius/8`     | `metrics.radius8`   | 8px   |
| ...            | ...                 | ...   |

**Instructions:**

- List ALL radius values from Figma
- Format: `radius/X` → `metrics.radiusX`

**Usage Example:**

```typescript
// ❌ WRONG
borderRadius: 8,

// ✅ CORRECT
borderRadius: metrics.radius8,
```

## 4. ICON SIZE VARIABLE MAPPING

| Figma Variable | Code Implementation  | Value |
| -------------- | -------------------- | ----- |
| `icon-size/16` | `metrics.iconSize16` | 16px  |
| `icon-size/24` | `metrics.iconSize24` | 24px  |
| ...            | ...                  | ...   |

**Instructions:**

- List ALL icon size values from Figma
- Format: `icon-size/X` → `metrics.iconSizeX`

## 5. TYPOGRAPHY VARIABLE MAPPING

### Font Sizes

| Figma Variable                 | Code Implementation | Value |
| ------------------------------ | ------------------- | ----- |
| `typography/font-size/text/xs` | `fontSizes.xs`      | 12px  |
| `typography/font-size/text/sm` | `fontSizes.sm`      | 14px  |
| ...                            | ...                 | ...   |

### Font Weights

| Figma Variable                   | Code Implementation   | Value |
| -------------------------------- | --------------------- | ----- |
| `typography/font-weight/regular` | `fontWeights.regular` | '400' |
| `typography/font-weight/medium`  | `fontWeights.medium`  | '500' |
| ...                              | ...                   | ...   |

### Font Family

| Figma Variable           | Code Implementation | Value              |
| ------------------------ | ------------------- | ------------------ |
| `typography/font-family` | `fonts.family`      | 'YourFontName'     |
| Font(Regular)            | `fonts.regular`     | 'YourFont-Regular' |
| Font(Medium)             | `fonts.medium`      | 'YourFont-Medium'  |
| Font(Bold)               | `fonts.bold`        | 'YourFont-Bold'    |

### Line Heights (if applicable)

| Figma Variable                   | Code Implementation | Value |
| -------------------------------- | ------------------- | ----- |
| `typography/line-height/text/xs` | `lineHeights.xs`    | 18px  |
| `typography/line-height/text/sm` | `lineHeights.sm`    | 20px  |
| ...                              | ...                 | ...   |

**Instructions:**

- List ALL typography variables from Figma
- Adapt font family names to match your actual fonts
- Include line heights if your design system uses them

## 6. COMPLETE USAGE EXAMPLE

When AI generates code from Figma using `get_code`, it should transform:

### Figma Design Properties (Example):

```
Container:
  - padding: spacing/16          ← Figma variable
  - borderRadius: radius/8       ← Figma variable
  - backgroundColor: color/background/bg-primary  ← Figma variable

Text:
  - color: color/text/text-primary               ← Figma variable
  - fontSize: typography/font-size/text/md       ← Figma variable
  - fontWeight: typography/font-weight/medium    ← Figma variable
```

### Into React Native Code:

```typescript
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {colors} from '@/themes/colors'
import {metrics, fontSizes, fontWeights, fonts} from '@/themes/metrics'

const Component = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: metrics.spacing16, // ← Mapped from spacing/16
    borderRadius: metrics.radius8, // ← Mapped from radius/8
    backgroundColor: colors.background.primary, // ← Mapped from color/background/bg-primary
  },
  text: {
    color: colors.text.primary, // ← Mapped from color/text/text-primary
    fontSize: fontSizes.md, // ← Mapped from typography/font-size/text/md
    fontWeight: fontWeights.medium, // ← Mapped from typography/font-weight/medium
    fontFamily: fonts.medium, // ← Mapped from typography/font-family (Medium)
  },
})

export default Component
```

## 7. CODE GENERATION RULES

When generating code from Figma designs:

1. ✅ **ALWAYS** import theme tokens at the top of the file
2. ✅ **ALWAYS** use mapped code implementation instead of Figma variable names
3. ✅ **NEVER** use hardcoded values (numbers or hex colors)
4. ✅ **ALWAYS** use StyleSheet.create() for styles - inline styles are FORBIDDEN
5. ✅ **ALWAYS** use predefined metrics from metrics.ts - check before creating new ones
6. ✅ **ALWAYS** use `isIOS` from metrics instead of `Platform.OS`
7. ✅ **ALWAYS** check this mapping table before generating code
8. 🚨 **CRITICAL:** Icon size props MUST use `metrics.iconSize24` or `metrics.iconSize16`
9. 🚨 **CRITICAL:** NEVER use inline styles like `style={{ width: 24 }}`
10. 🚨 **CRITICAL:** NEVER use responsive functions directly in styles

### Before Generating Code Checklist:

- [ ] Identify all Figma variables used in the design
- [ ] Map each Figma variable to code implementation using this table
- [ ] Import necessary theme modules
- [ ] **Check metrics.ts for existing values before creating new ones**
- [ ] Use theme tokens in StyleSheet.create()
- [ ] Verify no hardcoded values remain
- [ ] **Replace ALL icon size props** (`size={24}` → `size={metrics.iconSize24}`)
- [ ] **Remove ALL inline styles** - use StyleSheet.create() instead
- [ ] **Remove ALL direct responsive function calls** - use predefined metrics
- [ ] **Replace `Platform.OS` with `isIOS` from metrics**

## 8. STYLING CONSTRAINTS

### 8.1 Inline Styles are FORBIDDEN

**🚨 CRITICAL: NEVER use inline styles**

```typescript
// ❌ WRONG - NEVER use inline styles
<View style={{ padding: 16, backgroundColor: '#fff' }}>
  <Text style={{ fontSize: 14 }}>Hello</Text>
</View>

// ❌ WRONG - Even with metrics tokens
<View style={{ padding: metrics.spacing16 }}>
  <Text>Hello</Text>
</View>

// ✅ CORRECT - Always use StyleSheet.create()
<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>

const styles = StyleSheet.create({
  container: {
    padding: metrics.spacing16,
    backgroundColor: colors.background.primary,
  },
  text: {
    fontSize: fontSizes.sm,
  },
})
```

### 8.2 Icon Size Props Must Use Metrics

**🚨 CRITICAL: Icon sizes MUST use metrics tokens**

```typescript
// ❌ WRONG
<Icon name="search" size={24} />
<Image source={icon} style={{ width: 24, height: 24 }} />

// ✅ CORRECT
<Icon name="search" size={metrics.iconSize24} />
<Image source={icon} style={styles.icon} />

const styles = StyleSheet.create({
  icon: {
    width: metrics.iconSize24,
    height: metrics.iconSize24,
  },
})
```

### 8.3 Metrics Reuse Rules

**🚨 CRITICAL: Always check existing metrics before creating new ones**

```typescript
// ❌ WRONG - Direct responsive calls
const styles = StyleSheet.create({
  container: {
    padding: responsiveHeight(16), // Use metrics.spacing16
    marginTop: responsiveHeight(24), // Use metrics.spacing24
  },
})

// ✅ CORRECT - Reuse predefined metrics
const styles = StyleSheet.create({
  container: {
    padding: metrics.spacing16, // Reuses existing value
    marginTop: metrics.spacing24, // Reuses existing value
  },
})

// ✅ CORRECT - Only create new metrics in metrics.ts if value doesn't exist
// In src/themes/metrics.ts:
const metrics = {
  // ... existing values
  homeBackgroundHeight: responsiveHeight(188), // NEW: Unique value
}
```

### 8.4 Platform Detection

**🚨 CRITICAL: Use `isIOS` from metrics instead of `Platform.OS`**

```typescript
// ❌ WRONG
import { Platform } from 'react-native'
behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

// ✅ CORRECT
import { isIOS } from '@/themes/metrics'
behavior={isIOS ? 'padding' : 'height'}
```

alwaysApply: true

````

**Important Notes:**
- The above is a **TEMPLATE** - populate it with YOUR actual Figma variables
- Run `get_variable_defs` first to get your complete list of variables
- Create one mapping entry for EACH variable returned from Figma
- Group variables logically by category
- Include all theming rules and styling constraints
- The `alwaysApply: true` ensures AI always references this file

### 3.3 Complete Rule File Contents

The complete `.cursor/rules/figma-theming-and-styling.mdc` file should include:

1. **Variable Mapping Tables** - All Figma variables mapped to code tokens
2. **Theming System Rules** - How to use metrics, platform detection, naming conventions
3. **Styling Constraints** - No inline styles, no hardcoded values, icon size rules
4. **Code Generation Rules** - Complete checklist for generating code from Figma
5. **Special Patterns** - Feedback colors, opacity, rounded elements, composite fonts

See the template above for the complete structure. The key additions beyond just variable mapping are:

- ✅ **Metrics Reuse Rules**: Check existing metrics before creating new ones
- ✅ **Platform Detection**: Use `isIOS` from metrics instead of `Platform.OS`
- ✅ **Inline Style Ban**: NEVER use inline styles, always use StyleSheet.create()
- ✅ **Icon Size Constraints**: MUST use `metrics.iconSize24`, never hardcoded `size={24}`
- ✅ **No Responsive Calls**: NEVER call `responsiveHeight()` directly in styles
- ✅ **Code Generation Checklist**: Complete checklist before submitting code

### 3.4 How to Use This Mapping

When implementing a design from Figma:

1. **Get Figma code** using `get_code` MCP command
2. **Identify Figma variables** in the generated code (e.g., `spacing/16`, `color/text/text-primary`)
3. **Refer to mapping table** in `.cursor/rules/figma-theming-and-styling.mdc`
4. **Replace Figma variables** with the corresponding code tokens
5. **Check existing metrics** before creating new values
6. **Remove inline styles** and use StyleSheet.create()
7. **Replace icon size props** with metrics tokens
8. **Replace Platform.OS** with `isIOS` from metrics
9. **Add proper imports** from theme files

**Example Transformation:**

```typescript
// ❌ BEFORE (Raw code from Figma get_code - hardcoded values)
const styles = StyleSheet.create({
  container: {
    padding: 16,                    // This was spacing/16 in Figma
    backgroundColor: '#hexValue',   // This was color/background/bg-primary in Figma
    borderRadius: 8,                // This was radius/8 in Figma
    gap: 12,                        // This was spacing/12 in Figma
  },
  title: {
    fontSize: 16,                   // This was typography/font-size/text/md
    fontWeight: '500',              // This was typography/font-weight/medium
    color: '#hexValue',             // This was color/text/text-primary
  }
})

// ✅ AFTER (Mapped to your code implementation using mapping table)
import { colors } from '@/themes/colors'
import { metrics, fontSizes, fontWeights } from '@/themes/metrics'

const styles = StyleSheet.create({
  container: {
    padding: metrics.spacing16,                 // spacing/16 → metrics.spacing16
    backgroundColor: colors.background.primary, // bg-primary → colors.background.primary
    borderRadius: metrics.radius8,              // radius/8 → metrics.radius8
    gap: metrics.spacing12,                     // spacing/12 → metrics.spacing12
  },
  title: {
    fontSize: fontSizes.md,                     // font-size/md → fontSizes.md
    fontWeight: fontWeights.medium,             // font-weight/medium → fontWeights.medium
    color: colors.text.primary,                 // text-primary → colors.text.primary
  }
})
````

**Process:**

1. Identify which Figma variable each hardcoded value represents
2. Look up the mapping in your `.cursor/rules/figma-variable-mapping.mdc` file
3. Replace with the corresponding theme token
4. Add necessary imports

---

## Step 4: Implementation Checklist

After setting up the theme system, verify the following:

### 4.1 Colors Verification

- [ ] All Figma colors are defined in `src/themes/colors.ts`
- [ ] Color names use camelCase convention
- [ ] Color hierarchy matches Figma structure
- [ ] Palette colors are in separate `palette` constant
- [ ] Existing color values are updated with Figma values
- [ ] `getColorOpacity` utility function is preserved

### 4.2 Metrics Verification

- [ ] All spacing values are defined with `responsiveHeight()`
- [ ] All radius values are defined with `responsiveHeight()`
- [ ] All icon sizes are defined
- [ ] Legacy values are maintained for compatibility
- [ ] Naming follows `spacing4`, `radius8`, `iconSize24` pattern

### 4.3 Typography Verification

- [ ] Font sizes defined in `fontSizes` constant
- [ ] Font weights defined in `fontWeights` constant
- [ ] Font family updated in `src/themes/fonts.ts`
- [ ] Line heights defined (if needed)
- [ ] All values use responsive functions

### 4.4 Theme Integration

- [ ] `src/themes/theme.ts` updated with new colors
- [ ] Component theming uses new design tokens
- [ ] Dark mode colors mapped correctly
- [ ] Backward compatibility maintained

### 4.5 Documentation

- [ ] Design system rules created
- [ ] Rules saved to `.cursor/rules/figma-theming-and-styling.mdc`
- [ ] Variable mapping tables complete
- [ ] Theming system rules documented
- [ ] Styling constraints defined
- [ ] Usage examples provided
- [ ] Best practices documented

---

## Step 5: Usage in Components

### 5.1 Importing Theme Values

```typescript
// Import colors
import {colors, palette} from '@/themes/colors'

// Import metrics, typography
import {metrics, fontSizes, fontWeights} from '@/themes/metrics'

// Import fonts
import {fonts} from '@/themes/fonts'

// Import complete theme
import {theme} from '@/themes'
```

### 5.2 Component Example

```typescript
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {colors} from '@/themes/colors'
import {metrics, fontSizes, fontWeights} from '@/themes/metrics'

const ExampleComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <Text style={styles.body}>This uses Figma design tokens</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary, // Use your actual color structure
    padding: metrics.spacing16, // Use your actual spacing values
    borderRadius: metrics.radius8, // Use your actual radius values
    gap: metrics.spacing12, // Use your actual spacing values
  },
  title: {
    color: colors.text.primary, // Use your actual text colors
    fontSize: fontSizes.lg, // Use your actual font sizes
    fontWeight: fontWeights.medium, // Use your actual font weights
  },
  body: {
    color: colors.text.secondary, // Use your actual text colors
    fontSize: fontSizes.md, // Use your actual font sizes
    fontWeight: fontWeights.regular, // Use your actual font weights
  },
})

export default ExampleComponent
```

**Note:** Replace the theme token names with your actual tokens defined in Step 2.

---

## Common Patterns

### Pattern 1: Using Color Hierarchy

```typescript
// ✅ Correct - Use hierarchical color names
<View style={{ backgroundColor: colors.background.primary }}>
  <Text style={{ color: colors.text.brand.primary }}>Brand Text</Text>
</View>

// ❌ Avoid - Flat or hardcoded colors
<View style={{ backgroundColor: '#fcfcfc' }}>
  <Text style={{ color: colors.brandPrimary }}>Brand Text</Text>
</View>
```

### Pattern 2: Using Feedback Colors

```typescript
// ✅ Correct - Use semantic feedback colors
const getStatusStyle = (status: 'success' | 'error' | 'warning' | 'info') => ({
  backgroundColor: colors.feedback[status].background,
  color: colors.feedback[status].text,
})

// Usage
<View style={getStatusStyle('success')}>
  <Text>Success Message</Text>
</View>
```

### Pattern 3: Using Responsive Spacing

```typescript
// ✅ Correct - Use predefined spacing tokens
const styles = StyleSheet.create({
  container: {
    padding: metrics.spacing16,
    gap: metrics.spacing8,
    marginBottom: metrics.spacing24,
  },
})

// ❌ Avoid - Direct responsive calls
const styles = StyleSheet.create({
  container: {
    padding: responsiveHeight(16), // Use metrics.spacing16 instead
    gap: responsiveHeight(8), // Use metrics.spacing8 instead
  },
})
```

### Pattern 4: Typography Composition

```typescript
// ✅ Correct - Compose typography tokens
const textStyles = {
  heading: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.xl,
    color: colors.text.primary,
  },
  body: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.md,
    color: colors.text.secondary,
  },
}
```

---

## Troubleshooting

### Issue 1: Colors Not Updating

**Problem**: Colors in the app don't reflect Figma values

**Solution**:

1. Clear Metro bundler cache: `npx expo start --clear`
2. Verify imports use correct paths
3. Check if old color constants are being imported
4. Restart development server

### Issue 2: Responsive Values Not Working

**Problem**: Spacing or fonts don't scale properly

**Solution**:

1. Verify `DESIGN_WIDTH` and `DESIGN_HEIGHT` match your design
2. Check that responsive functions are applied correctly
3. Ensure `Dimensions.get('window')` is used, not `screen`

### Issue 3: Type Errors with Theme

**Problem**: TypeScript errors when accessing theme values

**Solution**:

1. Ensure all constants use `as const` assertion
2. Update theme type definitions if using custom types
3. Rebuild TypeScript: `npx tsc --noEmit`

### Issue 4: Font Not Loading

**Problem**: Custom fonts from Figma not displaying

**Solution**:

1. Verify font files are in `src/assets/fonts/`
2. Check font loading in `MainLayout.tsx`
3. Ensure font names match in `fonts.ts` and `useFonts()` call
4. Run `npx expo install expo-font` if needed

---

## Maintenance

### Regular Updates

1. **Sync with Figma**: Run Step 1 periodically to get latest design tokens
2. **Update Rules**: Regenerate design system rules when major changes occur
3. **Deprecate Old Values**: Gradually remove unused legacy values
4. **Document Changes**: Keep changelog of theme updates

### Version Control

```bash
# Track theme changes
git add src/themes/
git commit -m "chore: update theme tokens from Figma design system"

# Tag major theme updates
git tag -a theme-v2.0.0 -m "Major theme update with Figma integration"
```

---

## Summary

This guideline ensures:

- ✅ Consistent design token naming across the codebase
- ✅ Direct synchronization between Figma and code
- ✅ Type-safe theme system with TypeScript
- ✅ Backward compatibility with existing code
- ✅ Scalable and maintainable theme architecture
- ✅ Clear documentation for team collaboration

By following these steps, your mobile application will maintain perfect synchronization with your Figma design system, ensuring visual consistency and reducing design-to-code discrepancies.
