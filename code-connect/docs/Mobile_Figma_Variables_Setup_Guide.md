# Mobile Theme Setup Guideline with Figma Variables

This document provides step-by-step instructions for AI agents to set up and synchronize mobile theme variables from exported Figma variable JSON files.

## Prerequisites

- Exported Figma variable JSON files from designers (one or more collection files)
- Existing project structure with theme files:
  - `src/themes/colors.ts`
  - `src/themes/metrics.ts`
  - `src/themes/fonts.ts`
  - `src/themes/theme.ts`

## Overview

The theme setup process consists of three main steps:

1. **Extract variables** from exported Figma JSON files (provided by designers)
2. **Transform and organize** variables into appropriate theme files
3. **Create design system rules** for consistent usage

---

## 🚨 CRITICAL RULES - READ FIRST

**MANDATORY Requirements for AI Agents:**

1. **🚨 NEVER AUTO-SELECT MODE NAMES**
   - When a JSON file contains multiple modes (e.g., "STS_base", "STS_dark", "Boro_USA_theme"), you MUST ask the user which mode to use
   - DO NOT proceed with extraction until user confirms the mode selection
   - DO NOT assume or guess which mode the user wants

2. **🚨 ALWAYS ASK USER BEFORE PROCEEDING**
   - If multiple modes exist in ANY collection, STOP immediately
   - Present all available modes to the user
   - Wait for explicit confirmation before continuing

3. **🚨 BLOCK EXTRACTION UNTIL CONFIRMATION**
   - No variable extraction should begin until mode selection is confirmed
   - This is a BLOCKING checkpoint - you cannot skip it

4. **🚨 PROJECT VARIABLES OVERRIDE CORE VARIABLES**
   - When the same variable exists in both Core_variables.json and project JSON, use the project JSON value
   - Example: If `spacing.16` exists in both files, the project JSON value takes precedence

---

## Step 1: Extract Variables from Exported JSON Files

## 1.0 Understanding the Two-File Workflow

### Overview

Users will typically provide **TWO** JSON files exported from Figma:

1. **Core_variables.json** (Base Design Tokens)
   - Contains foundational design tokens
   - Usually has a **single mode** called "Value"
   - Includes: spacing, radius, base color palettes, typography scales, icon sizes, shadows
   - Example structure:
   ```json
   {
     "collections": [{
       "name": "Core_variables",
       "modes": ["Value"],
       "variables": {
         "spacing": { "16": { "type": "number", "values": { "Value": 16 } } },
         "color": { "Red": { "50": { "type": "color", "values": { "Value": "#ff6467" } } } }
       }
     }]
   }
   ```

2. **Project-Specific JSON** (e.g., STS_Variables.json)
   - Contains semantic/project-specific variables
   - **Often has MULTIPLE modes** (e.g., "STS_base", "STS_dark", "Boro_USA_theme")
   - May reference or override core variables
   - Includes theme-specific colors, semantic color names
   - Example structure:
   ```json
   {
     "collections": [{
       "name": "STS_Variables",
       "modes": ["STS_base", "STS_dark", "Boro_USA_theme"],
       "variables": {
         "color": {
           "gray": {
             "10": {
               "type": "color",
               "values": {
                 "STS_base": "Core_variables:color/Neutral/10",
                 "STS_dark": "Core_variables:color/Neutral/A200",
                 "Boro_USA_theme": "Core_variables:color/Stone/10"
               }
             }
           }
         }
       }
     }]
   }
   ```

### Variable Override Behavior

**IMPORTANT:** When a variable name appears in BOTH files:
- ✅ **Project JSON value OVERRIDES Core JSON value**
- This allows project-specific customization while maintaining core tokens

**Example:**
```
Core_variables.json:
  spacing.16.values.Value = 16

STS_Variables.json:
  spacing.16.values.STS_base = 20

Result: Use 20 (from project JSON)
```

### Processing Order

1. Read Core_variables.json first (usually single mode)
2. Read Project JSON second (may have multiple modes)
3. **🚨 STOP if multiple modes detected - ask user for mode selection**
4. After confirmation, extract variables with project values overriding core values

---

### 1.1 Obtain Exported Variable JSON Files from Designers

Designers will export Figma variables as JSON files. You may receive one or multiple collection files:

**Example files**:
- `Core_variables.json` - Core design tokens (spacing, radius, base colors, typography)
- `STS_Variables.json` - Project-specific semantic variables (may include multiple themes/modes)
- Additional brand or theme-specific collections

**Where to place files**: Ask the user where they've placed the JSON files, or suggest placing them in:
```
code-connect/figma-exports/
```

### 1.2 Understanding the JSON Structure

Exported Figma variable files follow this structure:

```json
{
  "collections": [
    {
      "name": "Core_variables",
      "modes": ["Value"],
      "variables": {
        "spacing": {
          "16": {
            "type": "number",
            "values": {
              "Value": 16
            }
          }
        },
        "color": {
          "Neutral": {
            "10": {
              "type": "color",
              "values": {
                "Value": "#fcfcfc"
              }
            }
          }
        }
      }
    }
  ]
}
```

**Key structure elements**:
- `collections[]` - Array of variable collections
- `name` - Collection name (e.g., "Core_variables", "STS_Variables")
- `modes[]` - Array of mode names (e.g., ["Value"], ["STS_base", "STS_dark", "Boro_USA_theme"])
- `variables` - Nested object containing all variables by category
- `type` - Variable type: "number", "color", or "string"
- `values` - Object with mode names as keys and actual values

### 1.3 Read and Parse JSON Files

**Instructions for AI**:

#### Step 1: Ask for File Paths

Ask user for the paths to BOTH JSON files:
```
"Please provide the paths to the exported Figma variable JSON files:
1. Core_variables.json (base design tokens)
2. Project-specific variables JSON (e.g., STS_Variables.json)"
```

#### Step 2: Read JSON Files

Read each JSON file using the Read tool:
```typescript
Read({ file_path: "/path/to/Core_variables.json" })
Read({ file_path: "/path/to/STS_Variables.json" })
```

#### Step 3: Detect Multiple Modes (CRITICAL CHECKPOINT)

**🚨 MANDATORY MODE DETECTION:**

After reading each JSON file, immediately check the `modes` array:

```typescript
// Example detection logic
const collection = jsonData.collections[0]
const modes = collection.modes

if (modes.length > 1) {
  // 🚨 STOP - Multiple modes detected!
  // MUST ask user before proceeding
}
```

**Examples:**
- ✅ Single mode: `"modes": ["Value"]` → Proceed automatically
- 🚨 Multiple modes: `"modes": ["STS_base", "STS_dark", "Boro_USA_theme"]` → **STOP and ask user**

#### Step 4: Ask User for Mode Selection (IF MULTIPLE MODES EXIST)

**🚨 THIS IS A BLOCKING CHECKPOINT - DO NOT SKIP**

If multiple modes are detected in ANY collection:

1. **STOP all extraction immediately**
2. **List all available modes to the user**
3. **Ask which mode to use**
4. **Wait for explicit user confirmation**
5. **Only proceed after receiving confirmation**

**Required Question Template:**

```
🚨 MULTIPLE MODES DETECTED in [collection_name]

I found [X] modes in this collection:
- Mode 1: "[mode_name_1]"
- Mode 2: "[mode_name_2]"
- Mode 3: "[mode_name_3]"

Which mode would you like to use for theme variable extraction?

Please confirm the mode name exactly as shown above.
```

**Example:**

```
🚨 MULTIPLE MODES DETECTED in STS_Variables

I found 3 modes in this collection:
- Mode 1: "STS_base"
- Mode 2: "STS_dark"
- Mode 3: "Boro_USA_theme"

Which mode would you like to use for theme variable extraction?

Please confirm the mode name exactly as shown above.
```

#### Step 5: Record User's Mode Selection

After user responds, record their selection:
```
✅ User confirmed mode: "[selected_mode_name]"

I will now extract all variable values using the "[selected_mode_name]" mode.
Proceeding with extraction...
```

**🚨 ANTI-PATTERNS (WHAT NOT TO DO):**

❌ **NEVER do this:**
```
// WRONG - Auto-selecting first mode
const selectedMode = modes[0] // DON'T DO THIS!
```

❌ **NEVER do this:**
```
// WRONG - Assuming a mode without asking
"I'll use STS_base mode..." // DON'T DO THIS!
```

❌ **NEVER do this:**
```
// WRONG - Proceeding without waiting for confirmation
"I found multiple modes. Let me extract using STS_base..." // DON'T DO THIS!
```

✅ **CORRECT approach:**
```
// RIGHT - Always ask and wait
"I found 3 modes: STS_base, STS_dark, Boro_USA_theme. Which mode should I use?"
// WAIT for user response
// THEN proceed with user-selected mode
```

#### Step 6: Parse and Extract Variables

**Only after mode selection is confirmed**, parse and extract variables:

- Identify all collections in each file
- Note the modes available in each collection
- Extract variables by category (spacing, radius, color, typography, etc.)
- **Use the user-confirmed mode name** when accessing values from the `values` object

**Example value extraction:**
```typescript
// Using user-confirmed mode (e.g., "STS_base")
const selectedMode = "STS_base" // From user confirmation
const value = variable.values[selectedMode]

// NOT: const value = variable.values[modes[0]] ❌
```

#### Step 7: Categorize Extracted Variables

- **Spacing**: `variables.spacing.*`
- **Radius**: `variables.radius.*`
- **Colors**: `variables.color.*` (often nested: color.Category.Shade)
- **Typography**: `variables.typography.font-size.*`, `variables.typography.font-weight.*`, etc.
- **Icon Sizes**: `variables.icon-size.*`
- **Shadows**: `variables.shadow.*` (complex nested structure)

#### Step 8: Handle Variable Overrides

When merging Core_variables.json and Project JSON:
- If a variable path exists in BOTH files, use the **Project JSON value**
- Example: `spacing.16` in both files → Use project JSON value
- Document overridden variables with comments if helpful

### 1.4 Variable Categories Found in JSON Files

Based on the JSON structure, you will typically find:

**Core Design Tokens** (often in Core_variables.json):
- Spacing values: `spacing.0`, `spacing.4`, `spacing.8`, `spacing.16`, etc.
- Radius values: `radius.none`, `radius.xs`, `radius.sm`, `radius.md`, `radius.full`
- Base color palettes: `color.Neutral.*`, `color.Red.*`, `color.Blue.*`, etc. (with numeric shades)
- Icon sizes: `icon-size.16`, `icon-size.24`, `icon-size.32`
- Typography scales: `typography.font-size.*`, `typography.font-weight.*`, `typography.line-height.*`
- Shadow properties: `shadow.position.x.*`, `shadow.position.y.*`, `shadow.blur.*`, `shadow.spread.*`

**Semantic Variables** (often in project-specific JSON files):
- May reference or override core tokens
- May include multiple themes/modes
- Often include semantic color names mapped to base colors

**Note**: The actual categories and structure will depend on your Figma design system setup.

---

## Step 2: Transform and Organize Variables

### 2.0 Understanding JSON-to-Code Transformation

**AI Instructions for extracting values from JSON**:

**🚨 REMINDER: Use User-Confirmed Mode**
- Before starting any extraction, ensure you have the user-confirmed mode name from Step 1.3
- If you did not get mode confirmation yet, STOP and ask the user
- All `values.{modeName}` references must use the exact mode name the user confirmed

**Extraction Process:**

1. **Access nested structure**: Navigate through `collections[i].variables.{category}.{subcategory}.{name}`
2. **Extract value by mode**: Get the value using the **user-confirmed** mode name from `values.{modeName}`
   - ✅ Use: `variable.values[userConfirmedMode]`
   - ❌ Don't use: `variable.values[modes[0]]` or `variable.values["STS_base"]` (hardcoded)
3. **Handle type conversions**:
   - `type: "color"` → Use hex value directly (e.g., "#fcfcfc")
   - `type: "number"` → Use numeric value, apply responsive functions for metrics
   - `type: "string"` → Use string value directly (e.g., font family names)
4. **Apply override rules**:
   - If the same variable exists in both Core_variables.json and Project JSON, use the **Project JSON value**
   - Always check both files before deciding which value to use

**Example JSON value extraction**:

```typescript
// Example 1: Single mode (Core_variables.json)
// Variable at: collections[0].variables.spacing.16
// With mode "Value"
{
  "16": {
    "type": "number",
    "values": {
      "Value": 16
    }
  }
}
// ✅ Extract using mode "Value": 16 → Transform: metrics.spacing16 = responsiveHeight(16)

// Example 2: Multiple modes (STS_Variables.json)
// Variable at: collections[0].variables.color.gray.10
// User confirmed mode: "STS_base"
{
  "10": {
    "type": "color",
    "values": {
      "STS_base": "#fcfcfc",
      "STS_dark": "#1a1a1a",
      "Boro_USA_theme": "#fafaf9"
    }
  }
}
// ✅ CORRECT: Extract using user-confirmed mode "STS_base": "#fcfcfc"
// ❌ WRONG: Extract using modes[0] or hardcoded mode name

const userConfirmedMode = "STS_base" // From Step 1.3 user confirmation
const value = variable.values[userConfirmedMode] // "#fcfcfc"
// NOT: const value = variable.values[modes[0]] ❌
// NOT: const value = variable.values["STS_base"] ❌ (unless user confirmed this exact string)
```

**Handling multiple collections and file merging**:

1. **Process Core_variables.json first**:
   - Extract all variables using mode "Value" (usually single mode)
   - Store in memory

2. **Process Project JSON second** (e.g., STS_Variables.json):
   - Extract all variables using **user-confirmed mode**
   - Check if variable already exists from Core_variables.json
   - **Override rule**: Project JSON values ALWAYS override Core JSON values

3. **Example override scenario**:
   ```typescript
   // Core_variables.json
   spacing.16.values.Value = 16

   // STS_Variables.json (user confirmed mode: "STS_base")
   spacing.16.values.STS_base = 20

   // ✅ RESULT: Use 20 (Project JSON overrides Core JSON)
   // In code: metrics.spacing16 = responsiveHeight(20)
   ```

4. **Document overrides**:
   - Add comments when project values override core values
   - Example: `spacing16: responsiveHeight(20), // Overridden from Core (was 16)`

### 2.1 COLORS - Update `src/themes/colors.ts`

**🚨 BEFORE YOU START:**
- Ensure you have the user-confirmed mode name from Step 1.3
- When extracting color values, use `variable.values[userConfirmedMode]`
- Apply override rule: Project JSON colors override Core JSON colors

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

1. Extract all color variables from `variables.color` in JSON files
2. Identify hierarchy patterns: Check nesting levels (color.category.name vs color.category.subcategory.name)
3. Determine if color belongs in `colors` (semantic) or `palette` (scale-based with numbers)
4. Create nested objects matching JSON structure
5. Convert category names to camelCase (e.g., "text-primary" → "primary", "Red" → "red")
6. Extract color values from the selected mode (e.g., `.values.Value` or `.values.STS_base`)

**Example Transformation from JSON:**

```typescript
// JSON Structure:
{
  "variables": {
    "color": {
      "text": {
        "text-primary": {
          "type": "color",
          "values": { "Value": "#123456" }
        }
      },
      "background": {
        "bg-primary": {
          "type": "color",
          "values": { "Value": "#ffffff" }
        }
      },
      "feedback": {
        "error": {
          "text": {
            "type": "color",
            "values": { "Value": "#ff0000" }
          }
        }
      }
    }
  }
}

// Code Implementation:
const colors = {
  text: {
    primary: '#123456',      // from color.text.text-primary.values.Value
  },
  background: {
    primary: '#ffffff',      // from color.background.bg-primary.values.Value
  },
  feedback: {
    error: {
      text: '#ff0000',       // from color.feedback.error.text.values.Value
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

1. Identify numeric patterns in JSON color variables (e.g., `color.Red.10`, `color.Blue.50`)
2. Look for color categories with numeric keys (10, 20, 50, 100, etc.)
3. Group by color name (all Red shades together, all Blue shades together)
4. Convert category name to lowercase camelCase (e.g., "Red" → "red", "Neutral" → "neutral")
5. Use underscore prefix for numeric keys (`10` → `_10`, `100` → `_100`)
6. Extract hex values from selected mode

**Example Transformation from JSON:**

```typescript
// JSON Structure:
{
  "variables": {
    "color": {
      "Red": {
        "100": {
          "type": "color",
          "values": { "Value": "#ffcccc" }
        },
        "500": {
          "type": "color",
          "values": { "Value": "#ff0000" }
        }
      },
      "Blue": {
        "300": {
          "type": "color",
          "values": { "Value": "#6699ff" }
        }
      }
    }
  }
}

// Code Implementation:
const palette = {
  red: {                              // from color.Red (lowercase)
    _100: '#ffcccc',                  // from color.Red.100.values.Value
    _500: '#ff0000',                  // from color.Red.500.values.Value
  },
  blue: {                             // from color.Blue (lowercase)
    _300: '#6699ff',                  // from color.Blue.300.values.Value
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

**🚨 BEFORE YOU START:**
- Ensure you have the user-confirmed mode name from Step 1.3
- When extracting metric values, use `variable.values[userConfirmedMode]`
- Apply override rule: Project JSON metrics override Core JSON metrics

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

1. Extract spacing values from `variables.spacing` in JSON files
   - Convert: `spacing.16.values.{mode}` → `spacingX: responsiveHeight(X)`
   - Handle both numeric keys (16) and named keys (if any)
2. Extract radius values from `variables.radius` in JSON files
   - Convert: `radius.md.values.{mode}` → `radiusMd: responsiveHeight(value)`
   - Convert: `radius.8.values.{mode}` → `radius8: responsiveHeight(8)`
   - Special case: `radius.round` with value 1000 → `radiusRound: responsiveHeight(1000)`
3. Extract icon sizes from `variables.icon-size` in JSON files (if present)
   - Convert: `icon-size.24.values.{mode}` → `iconSize24: responsiveHeight(24)`
4. Keep existing legacy values for backward compatibility

#### 2.2.3 Update Strategy

When updating metrics:

1. ✅ **Add new Figma values** with their exact names
2. ✅ **Keep legacy values** for backward compatibility
3. ✅ **Document equivalents** with comments (e.g., `// Same as spacing16`)
4. ✅ **Gradually migrate** old usage to new names in future refactoring

---

### 2.3 TYPOGRAPHY - Update `src/themes/metrics.ts`

**🚨 BEFORE YOU START:**
- Ensure you have the user-confirmed mode name from Step 1.3
- When extracting typography values, use `variable.values[userConfirmedMode]`
- Apply override rule: Project JSON typography overrides Core JSON typography

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

1. Extract font sizes from `variables.typography.font-size` in JSON files
   - Convert: `typography.font-size.md.values.{userConfirmedMode}` → `fontSizes.md: responsiveFont(value)`
   - ✅ Use user-confirmed mode: `variable.values[userConfirmedMode]`
   - Handle all size keys (xs, sm, md, lg, xl, 2xl, etc.)
2. Extract font weights from `variables.typography.font-weight` in JSON files
   - Convert: `typography.font-weight.medium.values.{userConfirmedMode}` → `fontWeights.medium: 'value'`
   - ✅ Use user-confirmed mode: `variable.values[userConfirmedMode]`
   - Convert numeric values to strings (500 → '500')
3. Extract font family from `variables.typography.font-family` in JSON files
   - Get string value from user-confirmed mode: `variable.values[userConfirmedMode]`
   - Update font family names in `fonts.ts` to match actual font file names
4. Extract line heights from `variables.typography.line-height` (if present)
   - Convert: `typography.line-height.md.values.{userConfirmedMode}` → `lineHeights.md: responsiveHeight(value)`
   - ✅ Use user-confirmed mode: `variable.values[userConfirmedMode]`

---

## Step 3: Create Design System Rules (Figma Theming and Styling)

### 3.1 Purpose of Design System Rules

The design system rules file acts as a **bridge** between Figma variables and your code implementation. It supports **TWO** variable sources:

1. **JSON Exports** (Setup Phase): Used to initially set up theme variables in your codebase
2. **MCP `get_variable_defs`** (Implementation Phase): Used when AI generates code from Figma designs

**Why Both Formats?**

- **JSON exports** → Set up complete theme system with all variables (Step 1-2 of this guide)
- **MCP `get_variable_defs`** → Extract variables from specific Figma designs during code generation
- **Design system rules** → Map BOTH formats to the same code tokens for consistency

**Example Mappings:**

**From JSON (nested structure):**
- JSON path: `variables.spacing.4` → Code: `metrics.spacing4`
- JSON path: `variables.color.text.text-primary` → Code: `colors.text.primary`

**From MCP (flat path):**
- MCP path: `spacing/4` → Code: `metrics.spacing4`
- MCP path: `color/text/text-primary` → Code: `colors.text.primary`

**Both paths → Same code implementation** ✅

**This file also includes:**

- ✅ Dual-format variable mapping tables (JSON paths + MCP paths → Code)
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

**IMPORTANT: Include BOTH JSON and MCP paths for complete mapping**

Create tables for EACH color category found in your Figma JSON exports:

### Example: Text Colors (Semantic Colors)

| JSON Path                               | MCP Path                     | Code Implementation     | Hex Value |
| --------------------------------------- | ---------------------------- | ----------------------- | --------- |
| `variables.color.text.text-primary`     | `color/text/text-primary`    | `colors.text.primary`   | #292929   |
| `variables.color.text.text-secondary`   | `color/text/text-secondary`  | `colors.text.secondary` | #656565   |
| `variables.color.text.text-tertiary`    | `color/text/text-tertiary`   | `colors.text.tertiary`  | #656565   |
| ...                                     | ...                          | ...                     | ...       |

### Example: Icon Colors

| JSON Path                            | MCP Path                  | Code Implementation  | Hex Value |
| ------------------------------------ | ------------------------- | -------------------- | --------- |
| `variables.color.icon.white`         | `color/icon/white`        | `colors.icon.white`  | #fcfcfc   |
| `variables.color.icon.primary`       | `color/icon/primary`      | `colors.icon.primary`| #292929   |
| ...                                  | ...                       | ...                  | ...       |

### Example: Background Colors (Semantic Colors)

| JSON Path                                   | MCP Path                           | Code Implementation           | Hex Value |
| ------------------------------------------- | ---------------------------------- | ----------------------------- | --------- |
| `variables.color.background.layer-01`       | `color/background/layer-01`        | `colors.background.layer01`   | #efefef   |
| `variables.color.background.layer-02`       | `color/background/layer-02`        | `colors.background.layer02`   | #fcfcfc   |
| ...                                         | ...                                | ...                           | ...       |

### Example: Button Colors

| JSON Path                       | MCP Path                  | Code Implementation    | Hex Value |
| ------------------------------- | ------------------------- | ---------------------- | --------- |
| `variables.color.button.primary`| `color/button/primary`    | `colors.button.primary`| #78b032   |
| ...                             | ...                       | ...                    | ...       |

### Example: Feedback Colors (Semantic Colors)

| JSON Path                                       | MCP Path                                    | Code Implementation                  | Hex Value |
| ----------------------------------------------- | ------------------------------------------- | ------------------------------------ | --------- |
| `variables.color.feedback.success.text`         | `color/feedback/text/success`               | `colors.feedback.success.text`       | #hexValue |
| `variables.color.feedback.success.background`   | `color/feedback/background/success`         | `colors.feedback.success.background` | #hexValue |
| `variables.color.feedback.error.text`           | `color/feedback/text/error`                 | `colors.feedback.error.text`         | #hexValue |
| ...                                             | ...                                         | ...                                  | ...       |

### Example: Color Palette (Base Colors with Numeric Scales)

| JSON Path                    | MCP Path           | Code Implementation   | Hex Value |
| ---------------------------- | ------------------ | --------------------- | --------- |
| `variables.color.Red.10`     | `color/Red/10`     | `palette.red._10`     | #fef2f2   |
| `variables.color.Red.50`     | `color/Red/50`     | `palette.red._50`     | #ff6467   |
| `variables.color.Red.100`    | `color/Red/100`    | `palette.red._100`    | #82181a   |
| `variables.color.Blue.50`    | `color/Blue/50`    | `palette.blue._50`    | #51a2ff   |
| `variables.color.Neutral.10` | `color/Neutral/10` | `palette.neutral._10` | #fcfcfc   |
| ...                          | ...                | ...                   | ...       |

**Instructions:**

- List ALL color variables from your exported JSON files
- **Include BOTH JSON path AND MCP path** for each variable
- Group by category (text, icon, background, button, border, feedback for semantic colors)
- Separate palette colors (those with numeric scales like Neutral.10, Red.50) into their own section
- Include the hex value for reference
- **MCP path format**: Remove `variables.` prefix, use slashes instead of dots

**Path Conversion Examples:**
```
JSON: variables.color.text.text-primary  → MCP: color/text/text-primary
JSON: variables.color.icon.white         → MCP: color/icon/white
JSON: variables.color.Red.50             → MCP: color/Red/50
```

## 2. SPACING VARIABLE MAPPING

**IMPORTANT: Include BOTH JSON and MCP paths**

| JSON Path                | MCP Path      | Code Implementation | Value |
| ------------------------ | ------------- | ------------------- | ----- |
| `variables.spacing.2`    | `spacing/2`   | `metrics.spacing2`  | 2px   |
| `variables.spacing.4`    | `spacing/4`   | `metrics.spacing4`  | 4px   |
| `variables.spacing.8`    | `spacing/8`   | `metrics.spacing8`  | 8px   |
| `variables.spacing.16`   | `spacing/16`  | `metrics.spacing16` | 16px  |
| `variables.spacing.24`   | `spacing/24`  | `metrics.spacing24` | 24px  |
| ...                      | ...           | ...                 | ...   |

**Instructions:**

- List ALL spacing values from JSON files
- **Include BOTH JSON path AND MCP path** for each variable
- Extract from: `collections[].variables.spacing.*`
- Format: `spacing.X` → `metrics.spacingX`
- Include pixel value for reference
- **MCP path format**: `spacing/X` (no `variables.` prefix)

**Path Conversion:**
```
JSON: variables.spacing.16  → MCP: spacing/16  → Code: metrics.spacing16
```

**Usage Example:**

```typescript
// ❌ WRONG - Hardcoded
padding: 16,

// ✅ CORRECT - Using mapped token (works with BOTH JSON and MCP)
import { metrics } from '@/themes/metrics'
padding: metrics.spacing16,  // From variables.spacing.16 OR spacing/16
```

## 3. RADIUS VARIABLE MAPPING

**IMPORTANT: Include BOTH JSON and MCP paths**

| JSON Path                | MCP Path      | Code Implementation                    | Value  |
| ------------------------ | ------------- | -------------------------------------- | ------ |
| `variables.radius.0`     | `radius/0`    | `metrics.radius0`                      | 0px    |
| `variables.radius.8`     | `radius/8`    | `metrics.radius8`                      | 8px    |
| `variables.radius.12`    | `radius/12`   | `metrics.radius12`                     | 12px   |
| `variables.radius.round` | `radius/round`| `metrics.radiusRound`                  | 1000px |
| ...                      | ...           | ...                                    | ...    |

**Instructions:**

- List ALL radius values from JSON files
- **Include BOTH JSON path AND MCP path** for each variable
- Extract from: `collections[].variables.radius.*`
- Handle both named keys (round) and numeric keys (0, 8, 12)
- Special case: `round` typically has value 1000 or 9999
- **MCP path format**: `radius/X` (no `variables.` prefix)

**Path Conversion:**
```
JSON: variables.radius.8     → MCP: radius/8     → Code: metrics.radius8
JSON: variables.radius.round → MCP: radius/round → Code: metrics.radiusRound
```

**Usage Example:**

```typescript
// ❌ WRONG
borderRadius: 8,

// ✅ CORRECT (works with BOTH JSON and MCP)
borderRadius: metrics.radius8,  // From variables.radius.8 OR radius/8
```

## 4. ICON SIZE VARIABLE MAPPING

**IMPORTANT: Include BOTH JSON and MCP paths**

| JSON Path                 | MCP Path        | Code Implementation  | Value |
| ------------------------- | --------------- | -------------------- | ----- |
| `variables.icon-size.16`  | `icon-size/16`  | `metrics.iconSize16` | 16px  |
| `variables.icon-size.20`  | `icon-size/20`  | `metrics.iconSize20` | 20px  |
| `variables.icon-size.24`  | `icon-size/24`  | `metrics.iconSize24` | 24px  |
| `variables.icon-size.32`  | `icon-size/32`  | `metrics.iconSize32` | 32px  |
| ...                       | ...             | ...                  | ...   |

**Instructions:**

- List ALL icon size values from JSON files
- **Include BOTH JSON path AND MCP path** for each variable
- Extract from: `collections[].variables.icon-size.*` (if present)
- Format: `icon-size.X` → `metrics.iconSizeX`
- **MCP path format**: `icon-size/X` (no `variables.` prefix)

**Path Conversion:**
```
JSON: variables.icon-size.24 → MCP: icon-size/24 → Code: metrics.iconSize24
```

## 5. TYPOGRAPHY VARIABLE MAPPING

**IMPORTANT: Include BOTH JSON and MCP paths**

### Font Sizes

| JSON Path                           | MCP Path                     | Code Implementation | Value |
| ----------------------------------- | ---------------------------- | ------------------- | ----- |
| `variables.typography.font-size.xs` | `typography/font-size/xs`    | `fontSizes.xs`      | 12px  |
| `variables.typography.font-size.sm` | `typography/font-size/sm`    | `fontSizes.sm`      | 14px  |
| `variables.typography.font-size.md` | `typography/font-size/md`    | `fontSizes.md`      | 16px  |
| `variables.typography.font-size.lg` | `typography/font-size/lg`    | `fontSizes.lg`      | 18px  |
| `variables.typography.font-size.xl` | `typography/font-size/xl`    | `fontSizes.xl`      | 20px  |
| ...                                 | ...                          | ...                 | ...   |

### Font Weights

| JSON Path                                   | MCP Path                         | Code Implementation   | Value |
| ------------------------------------------- | -------------------------------- | --------------------- | ----- |
| `variables.typography.font-weight.regular`  | `typography/font-weight/regular` | `fontWeights.regular` | '400' |
| `variables.typography.font-weight.medium`   | `typography/font-weight/medium`  | `fontWeights.medium`  | '500' |
| `variables.typography.font-weight.semibold` | `typography/font-weight/semibold`| `fontWeights.semibold`| '600' |
| `variables.typography.font-weight.bold`     | `typography/font-weight/bold`    | `fontWeights.bold`    | '700' |
| ...                                         | ...                              | ...                   | ...   |

### Font Family

| JSON Path                          | MCP Path                   | Code Implementation | Value         |
| ---------------------------------- | -------------------------- | ------------------- | ------------- |
| `variables.typography.font-family` | `typography/font-family`   | `fonts.family`      | 'IBMPlexSans' |
| Font(Regular)                     | `fonts.regular`     | 'IBMPlexSans-Regular' |
| Font(Medium)                      | `fonts.medium`      | 'IBMPlexSans-Medium'  |
| Font(Bold)                        | `fonts.bold`        | 'IBMPlexSans-Bold'    |

**Note:** The font-family value from JSON is the base name. Map to actual font file names in your project.

### Line Heights (if applicable)

| JSON Path                              | MCP Path                        | Code Implementation | Value |
| -------------------------------------- | ------------------------------- | ------------------- | ----- |
| `variables.typography.line-height.xs`  | `typography/line-height/xs`     | `lineHeights.xs`    | 18px  |
| `variables.typography.line-height.sm`  | `typography/line-height/sm`     | `lineHeights.sm`    | 20px  |
| `variables.typography.line-height.md`  | `typography/line-height/md`     | `lineHeights.md`    | 22px  |
| ...                                    | ...                             | ...                 | ...   |

### Letter Spacing (if applicable)

| JSON Path                                  | MCP Path                           | Code Implementation    | Value |
| ------------------------------------------ | ---------------------------------- | ---------------------- | ----- |
| `variables.typography.letter-spacing.xs`   | `typography/letter-spacing/xs`     | `letterSpacing.xs`     | 0     |
| `variables.typography.letter-spacing.md`   | `typography/letter-spacing/md`     | `letterSpacing.md`     | 0     |
| `variables.typography.letter-spacing.4xl`  | `typography/letter-spacing/4xl`    | `letterSpacing._4xl`   | -2    |
| ...                                        | ...                                | ...                    | ...   |

**Instructions:**

- List ALL typography variables from JSON files
- **Include BOTH JSON path AND MCP path** for each variable
- Extract from: `collections[].variables.typography.*`
- Font family value from JSON may need to be mapped to actual font file names
- Include line heights and letter spacing if present in your design system
- **MCP path format**: `typography/[property]/[value]` (no `variables.` prefix)

**Path Conversion:**
```
JSON: variables.typography.font-size.md      → MCP: typography/font-size/md      → Code: fontSizes.md
JSON: variables.typography.font-weight.medium → MCP: typography/font-weight/medium → Code: fontWeights.medium
JSON: variables.typography.line-height.xs    → MCP: typography/line-height/xs    → Code: lineHeights.xs
```

---

### 3.3 MCP Path Format Rules and Pattern Matching

**Understanding MCP Format:**

When AI uses MCP `get_variable_defs`, it receives variables in a **flat path format** using slashes (`/`) instead of the nested JSON structure:

**MCP Format Examples:**
```
color/icon/white: #fcfcfc
color/text/text-primary: #292929
typography/font-size/xs: 12
spacing/2: 2
radius/8: 8
icon-size/24: 24
```

**Pattern Matching Rules for AI:**

When generating code from MCP variable paths, use these transformation rules:

#### 1. Color Variables

**MCP Pattern:** `color/[category]/[name]`

**Transformation Rules:**
```
MCP Path                       → Code Token
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
color/icon/white               → colors.icon.white
color/icon/primary             → colors.icon.primary
color/text/text-primary        → colors.text.primary
color/background/layer-01      → colors.background.layer01
color/button/primary           → colors.button.primary
color/feedback/text/error      → colors.feedback.text.error
color/Red/50                   → palette.red._50  (uppercase → palette)
color/Neutral/10               → palette.neutral._10
```

**Rules:**
- Remove `color/` prefix
- Convert category to nested object access
- If category starts with uppercase (Red, Blue, Neutral) → use `palette.[lowercase]._[value]`
- Otherwise → use `colors.[category].[name]`
- Convert hyphens/underscores in property names: `text-primary` → `primary`, `layer-01` → `layer01`

#### 2. Spacing Variables

**MCP Pattern:** `spacing/[value]`

**Transformation Rules:**
```
MCP Path      → Code Token
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
spacing/2     → metrics.spacing2
spacing/4     → metrics.spacing4
spacing/16    → metrics.spacing16
```

**Rules:**
- Remove `spacing/` prefix
- Concatenate: `metrics.spacing` + `[value]`

#### 3. Radius Variables

**MCP Pattern:** `radius/[value]`

**Transformation Rules:**
```
MCP Path       → Code Token
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
radius/0       → metrics.radius0
radius/8       → metrics.radius8
radius/round   → metrics.radiusRound
```

**Rules:**
- Remove `radius/` prefix
- Concatenate: `metrics.radius` + `[value]` (camelCase for named values)

#### 4. Icon Size Variables

**MCP Pattern:** `icon-size/[value]`

**Transformation Rules:**
```
MCP Path       → Code Token
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
icon-size/16   → metrics.iconSize16
icon-size/24   → metrics.iconSize24
```

**Rules:**
- Remove `icon-size/` prefix
- Concatenate: `metrics.iconSize` + `[value]`

#### 5. Typography Variables

**MCP Pattern:** `typography/[property]/[value]`

**Transformation Rules:**
```
MCP Path                           → Code Token
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
typography/font-size/xs            → fontSizes.xs
typography/font-size/md            → fontSizes.md
typography/font-weight/regular     → fontWeights.regular
typography/font-weight/medium      → fontWeights.medium
typography/font-family             → fonts.family
typography/line-height/xs          → lineHeights.xs
typography/letter-spacing/4xl      → letterSpacing._4xl
```

**Rules:**
- Extract property type: `font-size`, `font-weight`, `font-family`, `line-height`, `letter-spacing`
- Map to corresponding code object:
  - `font-size` → `fontSizes.[value]`
  - `font-weight` → `fontWeights.[value]`
  - `font-family` → `fonts.family`
  - `line-height` → `lineHeights.[value]`
  - `letter-spacing` → `letterSpacing.[value]` (numeric values get `_` prefix)

#### 6. General Transformation Algorithm

**Step-by-Step for AI:**

1. **Identify the variable category** (first segment before `/`)
   - `color` → Color mapping
   - `spacing` → Spacing mapping
   - `radius` → Radius mapping
   - `icon-size` → Icon size mapping
   - `typography` → Typography mapping

2. **Apply category-specific rules** (see above)

3. **Look up in mapping table** (from Section 1-5)
   - Find the MCP path in the mapping table
   - Use the corresponding "Code Implementation" column

4. **Generate code** with the mapped token
   ```typescript
   // MCP: spacing/16
   padding: metrics.spacing16

   // MCP: color/text/text-primary
   color: colors.text.primary
   ```

**Example Workflow:**

```
MCP Input: "spacing/16"
Step 1: Category = "spacing"
Step 2: Apply spacing rule → metrics.spacing + "16"
Step 3: Look up "spacing/16" in mapping table → metrics.spacing16
Step 4: Generate: padding: metrics.spacing16
```

---

## 6. COMPLETE USAGE EXAMPLE

When AI generates code from Figma, it needs to map variable references from **EITHER** JSON or MCP format to the same code tokens:

### Example A: From JSON Export (Setup Phase)

**JSON Structure:**
```json
{
  "variables": {
    "spacing": { "16": { "values": { "STS_base": 16 } } },
    "radius": { "8": { "values": { "STS_base": 8 } } },
    "color": {
      "background": { "layer-01": { "values": { "STS_base": "#efefef" } } },
      "text": { "text-primary": { "values": { "STS_base": "#292929" } } }
    },
    "typography": {
      "font-size": { "md": { "values": { "STS_base": 16 } } },
      "font-weight": { "medium": { "values": { "STS_base": 500 } } }
    }
  }
}
```

**Mapping Using JSON Paths:**
```
variables.spacing.16                     → metrics.spacing16
variables.radius.8                       → metrics.radius8
variables.color.background.layer-01      → colors.background.layer01
variables.color.text.text-primary        → colors.text.primary
variables.typography.font-size.md        → fontSizes.md
variables.typography.font-weight.medium  → fontWeights.medium
```

### Example B: From MCP get_variable_defs (Implementation Phase)

**MCP Output:**
```
Spacing Variables:
- spacing/16: 16

Radius Variables:
- radius/8: 8

Color Variables:
  Background Colors:
  - color/background/layer-01: #efefef

  Text Colors:
  - color/text/text-primary: #292929

Typography Variables:
  Font Sizes:
  - typography/font-size/md: 16

  Font Weights:
  - typography/font-weight/medium: 500
```

**Mapping Using MCP Paths:**
```
spacing/16                     → metrics.spacing16
radius/8                       → metrics.radius8
color/background/layer-01      → colors.background.layer01
color/text/text-primary        → colors.text.primary
typography/font-size/md        → fontSizes.md
typography/font-weight/medium  → fontWeights.medium
```

### ✅ Both Formats → Same Code Implementation:

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
    padding: metrics.spacing16,            // ← From JSON: variables.spacing.16 OR MCP: spacing/16
    borderRadius: metrics.radius8,         // ← From JSON: variables.radius.8 OR MCP: radius/8
    backgroundColor: colors.background.layer01, // ← From JSON: variables.color.background.layer-01 OR MCP: color/background/layer-01
  },
  text: {
    color: colors.text.primary,            // ← From JSON: variables.color.text.text-primary OR MCP: color/text/text-primary
    fontSize: fontSizes.md,                // ← From JSON: variables.typography.font-size.md OR MCP: typography/font-size/md
    fontWeight: fontWeights.medium,        // ← From JSON: variables.typography.font-weight.medium OR MCP: typography/font-weight/medium
    fontFamily: fonts.medium,              // ← Based on font-family value
  },
})

export default Component
```

**Key Point:** Regardless of whether the variable came from JSON exports (setup) or MCP (implementation), the final React Native code uses the **same theme tokens** for consistency.

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
- Read and parse the exported JSON files first to get your complete list of variables
- Create one mapping entry for EACH variable found in the JSON files
- Group variables logically by category (colors, spacing, typography, etc.)
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

1. **Get Figma design code** using `get_design_context` tool
2. **Identify Figma variable references** in the design (e.g., references to `spacing.16`, `color.text.primary`)
3. **Refer to mapping table** in `.cursor/rules/figma-theming-and-styling.mdc`
4. **Replace variable references** with the corresponding code tokens from your theme
5. **Check existing metrics** before creating new values
6. **Remove inline styles** and use StyleSheet.create()
7. **Replace icon size props** with metrics tokens
8. **Replace Platform.OS** with `isIOS` from metrics
9. **Add proper imports** from theme files

**Example Transformation:**

```typescript
// ❌ BEFORE (Raw code from Figma - hardcoded values)
const styles = StyleSheet.create({
  container: {
    padding: 16,                    // This references variables.spacing.16
    backgroundColor: '#hexValue',   // This references variables.color.background.primary
    borderRadius: 8,                // This references variables.radius.md (value: 8)
    gap: 12,                        // This references variables.spacing.12
  },
  title: {
    fontSize: 16,                   // This references variables.typography.font-size.md
    fontWeight: '500',              // This references variables.typography.font-weight.medium
    color: '#hexValue',             // This references variables.color.text.primary
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
