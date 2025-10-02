# Code Connect Integration Guide for Figma MCP

This document provides comprehensive instructions for using Figma Code Connect with MCP to ensure AI always reuses existing components when generating code from Figma designs.

## Table of Contents

1. [What is Code Connect?](#1-what-is-code-connect)
2. [Code Connect Workflow](#2-code-connect-workflow)
3. [Mandatory Rules](#3-mandatory-rules)
4. [Usage Examples](#4-usage-examples)
5. [Integration with Theme System](#5-integration-with-theme-system)

---

## 1. What is Code Connect?

**Code Connect** is a Figma feature that links design components to their actual code implementations in your codebase. This allows AI to generate code that uses your existing components instead of creating everything from scratch.

### 1.1 Benefits

- ✅ **Reuse existing components** instead of duplicating code
- ✅ **Maintain consistency** across the codebase
- ✅ **Reduce code generation errors** by referencing actual implementations
- ✅ **Speed up development** by leveraging pre-built components
- ✅ **Ensure design-code alignment** automatically
- ✅ **Prevent component duplication** and code bloat
- ✅ **Preserve established patterns** and best practices

### 1.2 How It Works

1. Designers link Figma components to code files in your repository
2. When AI generates code from Figma, it checks for Code Connect mappings
3. If a mapping exists, AI uses the linked component instead of generating new code
4. AI only generates custom code for elements without Code Connect mappings

---

## 2. Code Connect Workflow

### 2.1 Complete Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  Start: Figma Design Selected               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            Step 1: Extract Node ID from Figma URL           │
│  URL: https://figma.com/design/xxx?node-id=123-456         │
│  Node ID: 123:456                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│       Step 2: Run get_code_connect_map MCP Command          │
│  mcp_Figma_get_code_connect_map({                          │
│    nodeId: "123:456",                                       │
│    clientLanguages: "typescript",                           │
│    clientFrameworks: "react"                                │
│  })                                                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│   Step 2.5: 🚨 ANALYZE RESPONSE - CREATE MAPPING TABLE 🚨   │
│                                                             │
│  For EACH node in response:                                │
│    - Node ID: 123:456                                       │
│    - Has mapping? YES/NO                                    │
│    - Component: ButtonPrimary                               │
│    - Source: rn-base-component                              │
│    - Action: MUST REUSE (do not generate custom)           │
│                                                             │
│  ⚠️ STOP: Review this table before writing ANY code        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
                    ┌────────┐
                    │  Does  │
                    │  Code  │───Yes───┐
                    │Connect │         │
                    │ Exist? │         │
                    └────┬───┘         │
                         │             │
                        No             │
                         │             │
                         ▼             ▼
        ┌────────────────────┐  ┌─────────────────────┐
        │   PATH A:          │  │   PATH B:           │
        │ Generate New Code  │  │ Use Code Connect    │
        │                    │  │ (🚨 MANDATORY 🚨)   │
        └────────┬───────────┘  └──────┬──────────────┘
                 │                     │
                 ▼                     ▼
     ┌──────────────────────┐  ┌────────────────────────┐
     │ Run get_code MCP     │  │ 🚨 MANDATORY:          │
     │ Get raw Figma code   │  │ Read Component File    │
     └──────────┬───────────┘  │ Understand props/API   │
                │               └──────┬─────────────────┘
                ▼                     │
     ┌──────────────────────┐        ▼
     │ Apply Theme Mapping  │  ┌────────────────────────┐
     │ Replace hardcoded    │  │ 🚨 MANDATORY:          │
     │ values with tokens   │  │ Map Figma Props to     │
     └──────────┬───────────┘  │ Component Props        │
                │               └──────┬─────────────────┘
                ▼                     │
     ┌──────────────────────┐        ▼
     │ Use StyleSheet       │  ┌────────────────────────┐
     │ No inline styles     │  │ 🚨 MANDATORY:          │
     └──────────┬───────────┘  │ Import Component       │
                │               │ Use exact path & name  │
                │               │ NO custom generation!  │
                │               └──────┬─────────────────┘
                │                     │
                └──────────┬──────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ Apply Theme Tokens   │
                │ to container styles  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ ⚠️ FINAL CHECK:      │
                │ Did I use ALL Code   │
                │ Connect components?  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   Code Generated     │
                └──────────────────────┘
```

**🚨 CRITICAL STEP 2.5 - NEVER SKIP THIS:**

After getting Code Connect response, ALWAYS create this table:

| Node ID | Has Mapping? | Component Name | Source            | Action                     |
| ------- | ------------ | -------------- | ----------------- | -------------------------- |
| 85:439  | ✅ YES       | ButtonPrimary  | rn-base-component | 🚨 REUSE - DO NOT GENERATE |
| 85:440  | ❌ NO        | -              | -                 | ✅ Generate custom         |
| 85:441  | ✅ YES       | TextInput      | @/components      | 🚨 REUSE - DO NOT GENERATE |

Review this table BEFORE writing code. If you skip this, you WILL violate Code Connect.

### 2.2 Step-by-Step Process

#### Step 1: Extract Node ID from Figma URL

```
URL Format: https://figma.com/design/:fileKey/:fileName?node-id=123-456
Node ID Format: 123:456 (replace dash with colon)

Example:
URL: https://www.figma.com/design/ABC123/MyProject?node-id=123-456
Node ID: 123:456
```

#### Step 2: Check Code Connect Mappings

**ALWAYS run this command BEFORE generating any code:**

```typescript
mcp_Figma_get_code_connect_map({
  nodeId: '123:456', // Your Figma node ID
  clientLanguages: 'typescript',
  clientFrameworks: 'react',
})
```

**Example Response:**

```json
{
  "123:456": {
    "codeConnectSrc": "src/components/Button.tsx",
    "codeConnectName": "Button"
  },
  "123:457": {
    "codeConnectSrc": "src/components/TextInput.tsx",
    "codeConnectName": "TextInput"
  },
  "123:458": null // No Code Connect mapping
}
```

#### Step 3A: If Code Connect EXISTS (✅ Preferred Path)

When Code Connect mapping exists:

1. **Read the component file** to understand its API
2. **Check component props** and types
3. **Map Figma properties** to component props
4. **Import using exact path** from `codeConnectSrc`
5. **Use exact component name** from `codeConnectName`

**Example:**

```typescript
// Code Connect Response:
{
  "123:456": {
    "codeConnectSrc": "src/components/Button.tsx",
    "codeConnectName": "Button"
  }
}

// Step 1: Read src/components/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  onPress: () => void
  children: React.ReactNode
}

// Step 2: Generate code using the linked component
import { Button } from '@/components/Button'

const MyScreen = () => {
  return (
    <Button
      variant="primary"
      size="large"
      onPress={handlePress}
    >
      Click Me
    </Button>
  )
}
```

#### Step 3B: If Code Connect DOESN'T EXIST

When NO Code Connect mapping:

1. **Run `get_code` MCP** to get raw Figma code
2. **Apply theme token mapping** (colors, spacing, typography)
3. **Use StyleSheet.create()** for all styles
4. **Follow all styling constraints** (no inline styles, no hardcoded values)

**Example:**

```typescript
// No Code Connect mapping
// Generate custom component from Figma

import React from 'react'
import {Pressable, Text, StyleSheet} from 'react-native'
import {colors} from '@/themes/colors'
import {metrics, fontSizes, fontWeights} from '@/themes/metrics'
import {fonts} from '@/themes/fonts'

const CustomButton = ({onPress, children}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: metrics.spacing16,
    backgroundColor: colors.background.brandPrimary,
    borderRadius: metrics.radius8,
  },
  text: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.medium,
    color: colors.foreground.white,
  },
})

export default CustomButton
```

---

## 3. Mandatory Rules

### 3.1 Code Connect Priority Rules

**🚨 CRITICAL: Code Connect has HIGHEST PRIORITY**

```
Priority Order:
1. Check Code Connect FIRST (always)
2. Use linked components IF they exist (mandatory)
3. Generate new code ONLY when no Code Connect exists
4. Apply theme tokens ALWAYS (for all code)
```

**⚠️ STOP AND VERIFY CHECKLIST:**

Before writing ANY component code, answer these questions:

- [ ] Did I run `get_code_connect_map` for this node?
- [ ] Did the response contain a mapping for this node ID?
- [ ] If YES mapping exists → Am I importing and using that exact component?
- [ ] If NO mapping exists → Only then can I generate custom code

**🛑 RED FLAG WARNINGS:**

If you're about to write any of these, STOP and check Code Connect first:

- `<TouchableOpacity>` → Could be `ButtonPrimary`, `ButtonSecondary`, etc.
- `<Pressable>` → Could be a mapped button component
- `<TextInput>` → Could be a mapped input component
- `<View>` with complex styling → Could be a mapped container component
- Custom icon implementations → Could be mapped icon components

**Remember: If Code Connect says a component exists, you MUST use it. No exceptions.**

### 3.2 MUST DO Rules

**✅ When Code Connect mapping EXISTS:**

1. ✅ **MUST use the linked component** - Never generate duplicate code
2. ✅ **MUST import from the specified path** - Use exact `codeConnectSrc` path
3. ✅ **MUST use the exact component name** - Use `codeConnectName` exactly as provided
4. ✅ **MUST read the component file** - Understand props, API, and usage patterns
5. ✅ **MUST map Figma properties to component props** - Translate design properties correctly
6. ✅ **MUST check all nested components** - Children may also have Code Connect
7. ✅ **MUST apply theme tokens** - For container/layout styles around components

**❌ NEVER DO Rules (VIOLATIONS):**

```typescript
// ❌ VIOLATION 1: Generating new component when Code Connect exists
const Button = () => {
  return <Pressable>...</Pressable> // Code Connect says use src/components/Button.tsx!
}

// ❌ VIOLATION 2: Using wrong import path
import {Button} from '@/ui/Button' // Code Connect says src/components/Button.tsx!

// ❌ VIOLATION 3: Using wrong component name
import {CustomButton} from '@/components/Button' // Code Connect says name is "Button"!

// ❌ VIOLATION 4: Not checking Code Connect before generating
// ALWAYS run get_code_connect_map FIRST!

// ❌ VIOLATION 5: Recreating component logic
const MyButton = ({children}) => {
  // Duplicating existing Button component logic
  return <Button variant="primary">{children}</Button>
}

// ❌ VIOLATION 6: Ignoring component props
;<Button>Click Me</Button> // Missing required props like variant, onPress
```

### 3.3 Code Generation Checklist

**Before generating ANY code from Figma, complete this checklist:**

- [ ] Extract node ID from Figma URL
- [ ] Run `get_code_connect_map` for the node
- [ ] **🚨 CRITICAL: Analyze the Code Connect response**
  - [ ] List ALL node IDs that have mappings
  - [ ] Note component name and source for EACH mapping
  - [ ] Create a mapping reference table before coding
- [ ] Check if Code Connect mapping exists
- [ ] **IF Code Connect EXISTS:**
  - [ ] ⚠️ MANDATORY: Read linked component file
  - [ ] ⚠️ MANDATORY: Understand component props and API
  - [ ] ⚠️ MANDATORY: Map Figma properties to component props
  - [ ] ⚠️ MANDATORY: Import using exact path from `codeConnectSrc`
  - [ ] ⚠️ MANDATORY: Use exact name from `codeConnectName`
  - [ ] Check all nested/child components for Code Connect
  - [ ] **NEVER generate custom code for this element**
- [ ] **IF Code Connect DOESN'T EXIST:**
  - [ ] Run `get_code` MCP to get Figma code
  - [ ] Identify Figma variables
  - [ ] Map to theme tokens
  - [ ] Use StyleSheet.create()
  - [ ] No inline styles
  - [ ] No hardcoded values
- [ ] **ALWAYS:**
  - [ ] Apply theme token mapping
  - [ ] Import necessary theme modules
  - [ ] Verify no hardcoded values
  - [ ] **Double-check: Did I use ALL Code Connect components?**
  - [ ] Test code compiles

**⚠️ VIOLATION CHECK:**

After generating code, verify:

- [ ] Every node with Code Connect uses the linked component
- [ ] No `TouchableOpacity`/`Pressable` where `ButtonPrimary` exists
- [ ] No custom implementations duplicating Code Connect components
- [ ] All imports match `codeConnectSrc` paths exactly

---

## 3.4 Real-World Violation Example

### Case Study: Floating Action Button Violation

**Scenario:** Implementing a home screen with a floating action button from Figma.

**Code Connect Response:**

```json
{
  "85:439": {
    "componentName": "ButtonPrimary",
    "source": "https://github.com/.../rn-base-component/.../ButtonPrimary.d.ts",
    "snippet": "<ButtonPrimary children={<Icon source={require('@/assets/images/icon.png')} />}/>",
    "snippetImports": ["import { ButtonPrimary } from 'rn-base-component'"]
  }
}
```

**❌ VIOLATION - What was generated:**

```typescript
// WRONG - Ignored Code Connect mapping
;<TouchableOpacity style={styles.fab} onPress={handleAddAction}>
  <Text style={styles.fabIcon}>+</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    borderRadius: 1000,
    backgroundColor: colors.foreground.brandPrimary,
    // ... custom styling
  },
})
```

**Why this is wrong:**

1. ❌ Code Connect said to use `ButtonPrimary` from `rn-base-component`
2. ❌ Generated custom `TouchableOpacity` instead
3. ❌ Duplicated button functionality that already exists
4. ❌ Lost built-in theming, states, and accessibility features
5. ❌ Creates maintenance burden with duplicate code

**✅ CORRECT - Using Code Connect:**

```typescript
import {ButtonPrimary, Icon} from 'rn-base-component'

// CORRECT - Uses mapped component
;<ButtonPrimary onPress={handleAddAction} style={styles.fab} accessibilityLabel={getString('home.addAction')}>
  <Icon source={require('@/assets/images/plus-icon.png')} />
</ButtonPrimary>

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 124,
    right: metrics.spacing16,
    // Only container positioning, not button styling
  },
})
```

**Lessons Learned:**

1. **Always create the mapping table (Step 2.5)** before writing code
2. **Stop when you see `TouchableOpacity`** - check if it should be a mapped button
3. **Read the Code Connect response carefully** - it tells you exactly what to use
4. **Use the linked component's styling** - don't recreate its internal styles
5. **Container styles only** - only style the positioning, not the component itself

**Prevention Checklist:**

Before writing `<TouchableOpacity>`, ask:

- [ ] Did I check Code Connect for this node?
- [ ] Is there a mapped button component?
- [ ] Did I read the component's props/API?
- [ ] Am I using the exact import path?
- [ ] Am I only styling the container, not the component?

---

## 4. Usage Examples

### 4.1 Example 1: Simple Button with Code Connect

**Scenario:** Generate login button from Figma design

**Figma Design:**

- Node ID: `456:789`
- Component: Button
- Text: "Login"
- Variant: Primary
- Size: Medium

**Step 1: Check Code Connect**

```typescript
mcp_Figma_get_code_connect_map({
  nodeId: "456:789",
  clientLanguages: "typescript",
  clientFrameworks: "react"
})

// Response:
{
  "456:789": {
    "codeConnectSrc": "src/components/Button.tsx",
    "codeConnectName": "Button"
  }
}
```

**Step 2: Read Component**

```typescript
// Read src/components/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  icon?: string
  onPress: () => void
  disabled?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon,
  onPress,
  disabled,
  children,
}) => {
  // Component implementation...
}
```

**Step 3: Generate Code**

```typescript
// ✅ CORRECT - Using Code Connect component
import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Button} from '@/components/Button'
import {metrics} from '@/themes/metrics'

const LoginScreen = () => {
  const handleLogin = () => {
    // Login logic
  }

  return (
    <View style={styles.container}>
      <Button variant="primary" size="medium" onPress={handleLogin}>
        Login
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: metrics.spacing16,
  },
})

export default LoginScreen
```

### 4.2 Example 2: Form with Multiple Code Connect Components

**Scenario:** Generate registration form from Figma

**Figma Design:**

- Node ID: `100:200`
- Contains: Email TextInput (Node: `100:201`)
- Contains: Password TextInput (Node: `100:202`)
- Contains: Confirm Password TextInput (Node: `100:203`)
- Contains: Checkbox "I agree to terms" (Node: `100:204`)
- Contains: Submit Button (Node: `100:205`)

**Step 1: Check Code Connect for All Components**

```typescript
mcp_Figma_get_code_connect_map({
  nodeId: "100:200",  // Parent form
  clientLanguages: "typescript",
  clientFrameworks: "react"
})

// Response:
{
  "100:200": null,  // Parent container has no mapping
  "100:201": {      // Email TextInput
    "codeConnectSrc": "src/components/TextInput.tsx",
    "codeConnectName": "TextInput"
  },
  "100:202": {      // Password TextInput
    "codeConnectSrc": "src/components/TextInput.tsx",
    "codeConnectName": "TextInput"
  },
  "100:203": {      // Confirm Password TextInput
    "codeConnectSrc": "src/components/TextInput.tsx",
    "codeConnectName": "TextInput"
  },
  "100:204": {      // Checkbox
    "codeConnectSrc": "src/components/Checkbox.tsx",
    "codeConnectName": "Checkbox"
  },
  "100:205": {      // Button
    "codeConnectSrc": "src/components/Button.tsx",
    "codeConnectName": "Button"
  }
}
```

**Step 2: Read All Component Files**

```typescript
// src/components/TextInput.tsx
interface TextInputProps {
  label: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  error?: string
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
}

// src/components/Checkbox.tsx
interface CheckboxProps {
  label: string
  checked: boolean
  onToggle: (checked: boolean) => void
}

// src/components/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  onPress: () => void
  disabled?: boolean
  children: React.ReactNode
}
```

**Step 3: Generate Complete Form**

```typescript
// ✅ CORRECT - Using all Code Connect components
import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {TextInput} from '@/components/TextInput'
import {Checkbox} from '@/components/Checkbox'
import {Button} from '@/components/Button'
import {metrics} from '@/themes/metrics'

const RegistrationScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleRegister = () => {
    // Registration logic
  }

  const isFormValid =
    email.length > 0 && password.length >= 8 && password === confirmPassword && agreedToTerms

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Checkbox
        label="I agree to the terms and conditions"
        checked={agreedToTerms}
        onToggle={setAgreedToTerms}
      />

      <Button variant="primary" size="large" onPress={handleRegister} disabled={!isFormValid}>
        Create Account
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.spacing16,
    gap: metrics.spacing16,
  },
})

export default RegistrationScreen
```

### 4.3 Example 3: Mixed - Code Connect + Custom Code

**Scenario:** Screen with custom header but reusable button

**Figma Design:**

- Node ID: `300:400`
- Contains: Custom Header with logo and title (Node: `300:401`) - No Code Connect
- Contains: Custom welcome message (Node: `300:402`) - No Code Connect
- Contains: "Get Started" Button (Node: `300:403`) - Has Code Connect
- Contains: "Learn More" Button (Node: `300:404`) - Has Code Connect

**Step 1: Check Code Connect**

```typescript
mcp_Figma_get_code_connect_map({
  nodeId: "300:400",
  clientLanguages: "typescript",
  clientFrameworks: "react"
})

// Response:
{
  "300:400": null,  // Parent has no mapping
  "300:401": null,  // Custom header - no mapping
  "300:402": null,  // Custom message - no mapping
  "300:403": {      // Get Started button
    "codeConnectSrc": "src/components/Button.tsx",
    "codeConnectName": "Button"
  },
  "300:404": {      // Learn More button
    "codeConnectSrc": "src/components/Button.tsx",
    "codeConnectName": "Button"
  }
}
```

**Step 2: Generate Mixed Code**

```typescript
// ✅ CORRECT - Mix of Code Connect and custom code
import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {Button} from '@/components/Button' // ← Code Connect
import {colors} from '@/themes/colors'
import {metrics, fontSizes, fontWeights} from '@/themes/metrics'
import {fonts} from '@/themes/fonts'
import {images} from '@/themes/images'

const WelcomeScreen = () => {
  const handleGetStarted = () => {
    // Navigate to sign up
  }

  const handleLearnMore = () => {
    // Navigate to info screen
  }

  return (
    <View style={styles.container}>
      {/* Custom Header - Generated from Figma (no Code Connect) */}
      <View style={styles.header}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.title}>Welcome to MyApp</Text>
        <Text style={styles.subtitle}>Your journey to success starts here</Text>
      </View>

      {/* Custom Message - Generated from Figma (no Code Connect) */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          Join thousands of users who have already transformed their lives
        </Text>
      </View>

      {/* Buttons - Using Code Connect */}
      <View style={styles.buttonContainer}>
        <Button variant="primary" size="large" onPress={handleGetStarted}>
          Get Started
        </Button>

        <Button variant="outline" size="large" onPress={handleLearnMore}>
          Learn More
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.spacing24,
    backgroundColor: colors.background.primary,
  },
  header: {
    alignItems: 'center',
    marginBottom: metrics.spacing32,
  },
  logo: {
    width: metrics.iconSize24 * 3,
    height: metrics.iconSize24 * 3,
    marginBottom: metrics.spacing16,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.medium,
    color: colors.text.primary,
    marginBottom: metrics.spacing8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  messageContainer: {
    padding: metrics.spacing16,
    backgroundColor: colors.background.brandPrimary,
    borderRadius: metrics.radius8,
    marginBottom: metrics.spacing32,
  },
  messageText: {
    fontSize: fontSizes.sm,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: metrics.spacing12,
  },
})

export default WelcomeScreen
```

### 4.4 Example 4: Nested Components with Code Connect

**Scenario:** Product card with multiple nested components

**Figma Design:**

- Product Card (Node: `500:100`)
  - Product Image (Node: `500:101`) - Custom
  - Product Title (Node: `500:102`) - Custom
  - Product Price (Node: `500:103`) - Custom
  - Add to Cart Button (Node: `500:104`) - Code Connect
  - Favorite Icon Button (Node: `500:105`) - Code Connect

**Step 1: Check All Components**

```typescript
mcp_Figma_get_code_connect_map({
  nodeId: "500:100",
  clientLanguages: "typescript",
  clientFrameworks: "react"
})

// Response:
{
  "500:100": null,  // Card container - no mapping
  "500:101": null,  // Image - no mapping
  "500:102": null,  // Title - no mapping
  "500:103": null,  // Price - no mapping
  "500:104": {      // Add to Cart Button
    "codeConnectSrc": "src/components/Button.tsx",
    "codeConnectName": "Button"
  },
  "500:105": {      // Favorite Icon Button
    "codeConnectSrc": "src/components/IconButton.tsx",
    "codeConnectName": "IconButton"
  }
}
```

**Step 2: Generate Product Card Component**

```typescript
// ✅ CORRECT - Nested mix of Code Connect and custom code
import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {Button} from '@/components/Button' // ← Code Connect
import {IconButton} from '@/components/IconButton' // ← Code Connect
import {colors} from '@/themes/colors'
import {metrics, fontSizes, fontWeights} from '@/themes/metrics'
import {fonts} from '@/themes/fonts'

interface ProductCardProps {
  product: {
    id: string
    title: string
    price: number
    imageUrl: string
  }
  onAddToCart: (id: string) => void
  onToggleFavorite: (id: string) => void
  isFavorite: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({product, onAddToCart, onToggleFavorite, isFavorite}) => {
  return (
    <View style={styles.card}>
      {/* Custom Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{uri: product.imageUrl}} style={styles.image} resizeMode="cover" />

        {/* Icon Button - Code Connect */}
        <IconButton
          icon={isFavorite ? 'heart-filled' : 'heart-outline'}
          onPress={() => onToggleFavorite(product.id)}
          style={styles.favoriteButton}
        />
      </View>

      {/* Custom Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>

      {/* Button - Code Connect */}
      <Button variant="primary" size="medium" onPress={() => onAddToCart(product.id)}>
        Add to Cart
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: metrics.radius12,
    padding: metrics.spacing16,
    gap: metrics.spacing12,
    shadowColor: colors.foreground.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    borderRadius: metrics.radius8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: metrics.spacing8,
    right: metrics.spacing8,
  },
  infoContainer: {
    gap: metrics.spacing4,
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.medium,
    color: colors.text.primary,
  },
  price: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.medium,
    color: colors.text.brandPrimary,
  },
})

export default ProductCard
```

---

## 5. Integration with Theme System

### 5.1 Code Connect + Theme Tokens

Code Connect components **MUST** work together with theme token mapping:

**Rule:** When using Code Connect components:

- ✅ Use Code Connect for **component imports and usage**
- ✅ Use theme tokens for **container/layout styles**
- ✅ Never override Code Connect component styles with inline styles

**Example:**

```typescript
// ✅ CORRECT - Code Connect + Theme Tokens
import { Button } from '@/components/Button'  // Code Connect
import { metrics } from '@/themes/metrics'    // Theme tokens

const MyScreen = () => {
  return (
    <View style={styles.container}>  {/* Theme tokens for layout */}
      <Button variant="primary" onPress={handlePress}>
        Submit
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: metrics.spacing16,  // ✅ Theme token
    gap: metrics.spacing12,      // ✅ Theme token
  },
})

// ❌ WRONG - Overriding Code Connect component
<View style={{ padding: 10 }}>  {/* ❌ Inline style + hardcoded */}
  <Button variant="primary" style={{ backgroundColor: 'red' }}>
    {/* ❌ Never override Code Connect component styles */}
    Submit
  </Button>
</View>
```

### 5.2 Priority Order

When generating code, follow this priority:

```
1. Code Connect Check (Highest Priority)
   ↓
2. Use Code Connect components if they exist
   ↓
3. Apply theme tokens for layout/container styles
   ↓
4. Generate custom code only when no Code Connect
   ↓
5. Apply theme tokens to custom code (Lowest Priority, Always Apply)
```

### 5.3 Complete Integration Example

```typescript
// Complete example showing Code Connect + Theme Token integration

import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'

// Code Connect Components
import {TextInput} from '@/components/TextInput'
import {Button} from '@/components/Button'
import {Checkbox} from '@/components/Checkbox'

// Theme System
import {colors} from '@/themes/colors'
import {metrics, fontSizes, fontWeights} from '@/themes/metrics'
import {fonts} from '@/themes/fonts'

const CompleteFormScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agreedToTerms: false,
  })

  const handleSubmit = () => {
    // Submit logic
  }

  return (
    <ScrollView style={styles.container}>
      {/* Custom Header - No Code Connect */}
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create your account</Text>
      </View>

      {/* Form Fields - Code Connect Components */}
      <View style={styles.form}>
        <TextInput
          label="Full Name"
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={name => setFormData({...formData, name})}
        />

        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={email => setFormData({...formData, email})}
          keyboardType="email-address"
        />

        <Checkbox
          label="I agree to the terms and conditions"
          checked={formData.agreedToTerms}
          onToggle={agreedToTerms => setFormData({...formData, agreedToTerms})}
        />
      </View>

      {/* Submit Button - Code Connect */}
      <Button variant="primary" size="large" onPress={handleSubmit} disabled={!formData.agreedToTerms}>
        Create Account
      </Button>

      {/* Custom Footer - No Code Connect */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Text style={styles.footerLink}>Sign In</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  // All styles use theme tokens
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: metrics.spacing24,
  },
  header: {
    marginBottom: metrics.spacing32,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.medium,
    color: colors.text.primary,
    marginBottom: metrics.spacing8,
  },
  subtitle: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    fontFamily: fonts.regular,
    color: colors.text.secondary,
  },
  form: {
    gap: metrics.spacing16,
    marginBottom: metrics.spacing24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: metrics.spacing4,
    marginTop: metrics.spacing24,
  },
  footerText: {
    fontSize: fontSizes.sm,
    color: colors.text.tertiary,
  },
  footerLink: {
    fontSize: fontSizes.sm,
    color: colors.text.brandPrimary,
    fontWeight: fontWeights.medium,
  },
})

export default CompleteFormScreen
```

---

## Summary

### Key Takeaways

1. **ALWAYS check Code Connect FIRST** before generating any code from Figma
2. **CREATE MAPPING TABLE (Step 2.5)** after getting Code Connect response
3. **MUST use linked components** when Code Connect mappings exist
4. **NEVER generate duplicate code** for components with Code Connect
5. **ALWAYS apply theme tokens** for layout and container styles
6. **Mix Code Connect and custom code** intelligently based on mappings
7. **Read component files** to understand props and API before using
8. **Map Figma properties** correctly to component props

### Workflow Summary

```
Figma Design → Check Code Connect → 🚨 CREATE MAPPING TABLE 🚨 → Use Linked Components (if exist) → Apply Theme Tokens → Done
                                                              ↓
                                                              Generate Custom Code (if no mapping) → Apply Theme Tokens → Done
```

### Rules Summary

- ✅ Code Connect = Highest Priority
- ✅ Mapping Table = MANDATORY before coding
- ✅ Theme Tokens = Always Apply
- ✅ Reuse > Generate
- ❌ Never duplicate components with Code Connect
- ❌ Never ignore Code Connect mappings
- ❌ Never skip the mapping table analysis
- ❌ Never use inline styles or hardcoded values

### Common Violations to Avoid

| Violation                                      | Instead Use                              |
| ---------------------------------------------- | ---------------------------------------- |
| `<TouchableOpacity>` when ButtonPrimary exists | `<ButtonPrimary>` from rn-base-component |
| `<Pressable>` when Button exists               | The mapped Button component              |
| Custom TextInput when mapped                   | The linked TextInput component           |
| Recreating component logic                     | Import and use existing component        |
| Skipping Code Connect check                    | Always run get_code_connect_map first    |
| Ignoring mapping response                      | Create table, review ALL mappings        |

### Final Warning

**🚨 THE MOST COMMON MISTAKE:**

Checking Code Connect, seeing a mapping exists, then **generating custom code anyway**.

**This happens when you:**

- ❌ Skip creating the mapping table (Step 2.5)
- ❌ Don't carefully read the Code Connect response
- ❌ Rush to code generation without analysis
- ❌ Forget to verify mapped components were used

**To prevent this:**

- ✅ ALWAYS create mapping table before coding
- ✅ Review table: "Which nodes MUST use existing components?"
- ✅ After coding: "Did I use ALL mapped components?"
- ✅ Code review: No `TouchableOpacity`/`Pressable` where buttons map

### Success Checklist

After implementing from Figma, verify:

- [ ] I ran `get_code_connect_map` for all nodes
- [ ] I created the mapping table (Step 2.5)
- [ ] Every mapped node uses the linked component
- [ ] No custom implementations for mapped components
- [ ] Imports match Code Connect sources exactly
- [ ] Props are correctly mapped from Figma to component
- [ ] Theme tokens applied for container/layout styles
- [ ] No inline styles or hardcoded values

By following this guide strictly, especially **Step 2.5 (mapping table creation)**, you ensure that AI-generated code from Figma designs consistently reuses your existing components while maintaining theme consistency across your entire application.

**Remember: Code Connect exists to prevent duplicate code. Honor it.**
