# Variable Update Workflow - AI Instructions

This document provides step-by-step instructions for AI agents to update existing theme variables when designers provide new or updated Figma variable JSON files.

## 🚨 CRITICAL RULES - READ FIRST

**MANDATORY Requirements for AI Agents:**

1. **🚨 NEVER AUTO-SELECT MODE NAMES**
   - When a JSON file contains multiple modes (e.g., "STS_base", "STS_dark", "Boro_USA_theme"), you MUST ask the user which mode to use
   - DO NOT proceed with variable comparison until user confirms the mode selection
   - DO NOT assume or guess which mode the user wants

2. **🚨 ALWAYS ASK USER BEFORE PROCEEDING**
   - If multiple modes exist in ANY collection, STOP immediately
   - Present all available modes to the user
   - Wait for explicit confirmation before continuing with comparison

3. **🚨 BLOCK COMPARISON UNTIL CONFIRMATION**
   - No variable comparison or extraction should begin until mode selection is confirmed
   - This is a BLOCKING checkpoint - you cannot skip it

4. **🚨 PROJECT VARIABLES OVERRIDE CORE VARIABLES**
   - When the same variable exists in both Core_variables.json and project JSON, use the project JSON value
   - Example: If `spacing.16` exists in both files, the project JSON value takes precedence

5. **🚨 TWO-FILE WORKFLOW**
   - Users typically provide TWO JSON files:
     - **Core_variables.json**: Base design tokens (usually single mode "Value")
     - **Project JSON** (e.g., STS_Variables.json): Semantic variables (often multiple modes)
   - Process Core first, then Project JSON second
   - Apply override rule: Project JSON values ALWAYS override Core JSON values

---

## Overview

When designers export updated variable files from Figma, AI should:
1. Read and parse both Core and Project JSON files
2. **🚨 STOP if multiple modes detected - ask user for mode selection**
3. Compare new variables against existing theme files (using user-confirmed mode)
4. Detect changes (added, removed, modified variables)
5. Present findings to user for review
6. Update theme files while preserving custom code
7. Regenerate design system rules if needed

---

## Step 1: Receive Updated JSON Files

### 1.0 Understanding the Two-File Update Workflow

When users provide updated Figma variables, they will typically give you **TWO** JSON files:

1. **Core_variables.json** (Base Design Tokens)
   - Contains foundational design tokens
   - Usually has a **single mode** called "Value"
   - Includes: spacing, radius, base color palettes, typography scales, icon sizes
   - Example: `spacing.16.values.Value = 16`

2. **Project-Specific JSON** (e.g., STS_Variables.json)
   - Contains semantic/project-specific variables
   - **Often has MULTIPLE modes** (e.g., "STS_base", "STS_dark", "Boro_USA_theme")
   - May reference or override core variables
   - Example: `spacing.16.values.STS_base = 20` (overrides Core)

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

Result: Use 20 (from project JSON) - This is the updated value
```

### 1.1 Ask User for Updated Files

**AI Prompt:**
```
"I see you have updated Figma variable JSON files. Please provide the paths to BOTH JSON files:
1. Core_variables.json (base design tokens)
2. Project-specific variables JSON (e.g., STS_Variables.json)"
```

### 1.2 Read New JSON Files

Use the Read tool to load each new JSON file:
```typescript
Read({ file_path: "/path/to/Core_variables.json" })
Read({ file_path: "/path/to/STS_Variables.json" })
```

### 1.3 Detect Multiple Modes (CRITICAL CHECKPOINT)

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

### 1.4 Ask User for Mode Selection (IF MULTIPLE MODES EXIST)

**🚨 THIS IS A BLOCKING CHECKPOINT - DO NOT SKIP**

If multiple modes are detected in ANY collection:

1. **STOP all comparison immediately**
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

Which mode would you like to use for comparing and updating theme variables?

Please confirm the mode name exactly as shown above.
```

**Example:**

```
🚨 MULTIPLE MODES DETECTED in STS_Variables

I found 3 modes in this collection:
- Mode 1: "STS_base"
- Mode 2: "STS_dark"
- Mode 3: "Boro_USA_theme"

Which mode would you like to use for comparing and updating theme variables?

Please confirm the mode name exactly as shown above.
```

### 1.5 Record User's Mode Selection

After user responds, record their selection:
```
✅ User confirmed mode: "[selected_mode_name]"

I will now compare variables using the "[selected_mode_name]" mode.
Proceeding with comparison...
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

✅ **CORRECT approach:**
```
// RIGHT - Always ask and wait
"I found 3 modes: STS_base, STS_dark, Boro_USA_theme. Which mode should I use?"
// WAIT for user response
// THEN proceed with user-selected mode
```

### 1.6 Read Existing Theme Files

Read current theme implementations to compare:
```typescript
Read({ file_path: "src/themes/colors.ts" })
Read({ file_path: "src/themes/metrics.ts" })
Read({ file_path: "src/themes/fonts.ts" })
```

---

## Step 2: Analyze Changes

### 2.1 Parse Both Old and New Variables

**🚨 BEFORE YOU START:**
- Ensure you have the user-confirmed mode name from Step 1.5
- When extracting values, use `variable.values[userConfirmedMode]`
- Apply override rule: Project JSON values override Core JSON values

**For NEW JSON files:**

1. **Process Core_variables.json first:**
   - Extract all variables from `collections[].variables.*`
   - Usually uses single mode "Value": `variable.values.Value`
   - Organize by category (spacing, radius, color, typography, etc.)
   - Store in memory

2. **Process Project JSON second:**
   - Extract all variables using **user-confirmed mode**
   - ✅ Use: `variable.values[userConfirmedMode]`
   - ❌ Don't use: `variable.values[modes[0]]` or hardcoded mode name
   - Check if variable already exists from Core_variables.json
   - **Override rule**: Project JSON values ALWAYS override Core JSON values

3. **Example override scenario:**
   ```typescript
   // Core_variables.json
   spacing.16.values.Value = 16

   // STS_Variables.json (user confirmed mode: "STS_base")
   spacing.16.values.STS_base = 20

   // ✅ RESULT: New value is 20 (Project JSON overrides Core JSON)
   // Compare this against existing theme: metrics.spacing16 = responsiveHeight(16)
   // Change detected: 16 → 20
   ```

**For EXISTING theme files:**
- Identify which values came from Figma (look for comments or standard naming)
- Identify custom values added by developers (non-Figma values)
- Build a map of current variable → value pairs
- Current theme represents the "old" state to compare against

### 2.2 Detect Changes

Compare and categorize changes:

**Added Variables:**
- Variables that exist in new JSON but not in existing theme files
- Example: `variables.spacing.14` didn't exist before

**Removed Variables:**
- Variables that existed in old theme but not in new JSON
- ⚠️ **IMPORTANT**: Don't remove if it might be a custom developer addition

**Modified Variables:**
- Variables where the value changed
- Example: `variables.color.Red.50` changed from `#ff6467` to `#ff7478`

**Unchanged Variables:**
- Variables with the same value in both old and new

### 2.3 Generate Change Report

Create a structured report for the user:

```markdown
## Figma Variable Changes Detected

### Summary
- **Added:** X variables
- **Modified:** Y variables
- **Removed:** Z variables
- **Unchanged:** N variables

### Details

#### Added Variables (X)

**Spacing:**
- `spacing.14` → value: 14 → Code: `metrics.spacing14`

**Colors:**
- `color.Purple.A100` → value: #3c0366 → Code: `palette.purple._A100`

#### Modified Variables (Y)

**Colors:**
- `color.Red.50`: `#ff6467` → `#ff7478`
  - Code impact: `palette.red._50`

**Spacing:**
- `spacing.16`: `16` → `18`
  - Code impact: `metrics.spacing16` (affects many components)

#### Removed Variables (Z)

**⚠️ These variables are in your theme but not in new JSON:**
- `metrics.customPadding` - appears to be a custom value (KEEP)
- `colors.legacy.primary` - may be custom (needs confirmation)

**Action needed:** Should these be kept or removed?
```

---

## Step 3: User Review and Approval

### 3.1 Present Report to User

Show the change report and ask for confirmation:

**AI Prompt:**
```
"I've analyzed the changes between your current theme and the new Figma variables.
Here's what I found:

[Insert Change Report]

Would you like me to:
1. Apply all changes automatically (keeping custom values)
2. Review each change individually
3. Cancel and keep current theme"
```

### 3.2 Handle User Response

**Option 1 - Apply All:**
- Proceed to Step 4 with all changes

**Option 2 - Review Individually:**
- For each changed variable, ask:
  ```
  "Update [variable_name] from [old_value] to [new_value]? (yes/no)"
  ```
- Track user decisions for each change

**Option 3 - Cancel:**
- Exit workflow without changes

---

## Step 4: Apply Updates

**🚨 REMINDER: Use User-Confirmed Mode**
- All updates must use values from the **user-confirmed mode** (from Step 1.5)
- When extracting values: Use `variable.values[userConfirmedMode]`
- Apply override rule: Project JSON values override Core JSON values

### 4.1 Update Colors (`src/themes/colors.ts`)

**🚨 BEFORE YOU START:**
- Ensure you're using values from the user-confirmed mode
- Remember: Project JSON colors override Core JSON colors
- Document overrides in comments when applicable

**For added color variables:**
1. Determine if it belongs in `colors` (semantic) or `palette` (scale-based)
2. Find the correct nested location based on JSON structure
3. Insert new property in appropriate location
4. Use camelCase naming convention
5. Extract value using: `variable.values[userConfirmedMode]`

**For modified color variables:**
1. Find existing color property
2. Update hex value using user-confirmed mode
3. Add comment indicating source and override status:
   ```typescript
   // Example with override
   _50: '#ff7478', // Updated 2025-10-24 from STS_Variables (overrides Core: #ff6467)

   // Example without override
   primary: '#292929', // Updated 2025-10-24 from Core_variables
   ```

**For removed color variables:**
1. Only remove if confirmed it's from Figma (not custom)
2. Add deprecation comment if unsure

**Example Edit:**

```typescript
// Adding new color
const palette = {
  red: {
    _50: '#ff7478',  // Updated from Figma variables.color.Red.50
    _100: '#ffcccc',
  },
  purple: {  // NEW from Figma
    _A100: '#3c0366',  // From variables.color.Purple.A100
  },
}
```

### 4.2 Update Metrics (`src/themes/metrics.ts`)

**🚨 BEFORE YOU START:**
- Ensure you're using values from the user-confirmed mode
- Remember: Project JSON metrics override Core JSON metrics
- Document overrides in comments when applicable

**For spacing variables:**
- Add new: `spacing14: responsiveHeight(14),` (using user-confirmed mode value)
- Modify existing: Update numeric value from user-confirmed mode
- Keep custom metrics that don't match Figma variables
- Document overrides if project value differs from core value

**For radius variables:**
- Add new radius values (using user-confirmed mode)
- Update modified values (using user-confirmed mode)
- Handle named keys (xs, sm, md) and numeric keys (4, 8)
- Document overrides in comments

**For icon sizes:**
- Add new sizes (using user-confirmed mode)
- Update existing sizes (using user-confirmed mode)
- Document overrides in comments

**Example Edit:**

```typescript
const metrics = {
  // Spacing from Figma
  spacing12: responsiveHeight(12),
  spacing14: responsiveHeight(14), // NEW from variables.spacing.14
  spacing16: responsiveHeight(20), // UPDATED from STS_Variables (overrides Core: 16)

  // Custom spacing (preserve)
  customPadding: responsiveHeight(22), // Custom developer value

  // ... rest of metrics
} as const
```

### 4.3 Update Typography (`src/themes/metrics.ts` and `src/themes/fonts.ts`)

**🚨 BEFORE YOU START:**
- Ensure you're using values from the user-confirmed mode
- Remember: Project JSON typography overrides Core JSON typography
- Document overrides in comments when applicable

**Font sizes:**
- Add new sizes (using user-confirmed mode value)
- Update modified sizes (using user-confirmed mode value)
- Use `responsiveFont()` wrapper
- Document overrides in comments

**Font weights:**
- Add new weights (using user-confirmed mode value)
- Update existing weights (using user-confirmed mode value)
- Ensure string format: '400', '500'
- Document overrides in comments

**Font family (`src/themes/fonts.ts`):**
- Update if font family name changed (using user-confirmed mode value)
- Map to actual font file names
- Document source in comments

**Line heights and letter spacing:**
- Add/update if present in JSON (using user-confirmed mode value)
- Document overrides in comments

### 4.4 Preserve Custom Values

**Critical Rule:** Never remove or modify values that appear to be custom additions.

**Identifying custom values:**
- Not found in JSON variables
- Has comments indicating "custom" or "legacy"
- Named differently than Figma pattern (e.g., `buttonHeight` vs `spacing16`)

**When in doubt:**
- Ask user before removing
- Add comment marking as "custom"
- Keep the value

---

## Step 5: Update Design System Rules

### 5.1 Check if Rules Need Updating

Rules file needs updating if:
- New variable categories added
- Many new variables in existing categories
- Variable naming patterns changed

### 5.2 Regenerate Mapping Tables

Update `.cursor/rules/figma-theming-and-styling.mdc`:

**For each added variable:**
- Add new row to appropriate mapping table
- Include JSON path, code implementation, and value

**For modified variables:**
- Update the value column (hex value or numeric value)

**For removed variables:**
- Remove from mapping table (if confirmed as Figma variable)

**Example update to rules file:**

```markdown
### Example: Color Palette (Base Colors with Numeric Scales)

| JSON Path                  | Code Implementation | Hex Value |
| -------------------------- | ------------------- | --------- |
| `variables.color.Red.10`   | `palette.red._10`   | #fcfcfc   |
| `variables.color.Red.50`   | `palette.red._50`   | #ff7478   | <!-- UPDATED -->
| `variables.color.Purple.A100` | `palette.purple._A100` | #3c0366 | <!-- NEW -->
```

---

## Step 6: Verification

### 6.1 Run Type Checking

**AI Prompt:**
```
"I've updated the theme files. Let me verify the changes by checking TypeScript types."
```

Use Bash tool:
```bash
npx tsc --noEmit
```

### 6.2 Search for Potential Issues

**Check for:**
- Unused imports
- Duplicate property names
- Syntax errors

Use Grep tool to find usages:
```typescript
Grep({ pattern: "palette\\.red\\._50", path: "src/", output_mode: "count" })
```

### 6.3 Generate Update Summary

Create final report for user:

```markdown
## Theme Update Complete

### Changes Applied

**Colors:**
- Added 3 new palette colors (Purple.A100, Blue.A200, etc.)
- Updated 2 existing colors (Red.50, Neutral.10)

**Metrics:**
- Added spacing14, spacing18
- Updated spacing16 value (16px → 18px)

**Typography:**
- No changes

**Custom values preserved:**
- metrics.customPadding
- colors.legacy.primary
- All custom metrics kept intact

### Files Modified
- ✅ src/themes/colors.ts
- ✅ src/themes/metrics.ts
- ✅ .cursor/rules/figma-theming-and-styling.mdc

### Next Steps
1. Review the changes in your theme files
2. Test components that use updated variables
3. Run your app to ensure no visual regressions
4. Consider updating components to use new variables where beneficial
```

---

## Step 7: Handle Edge Cases

### 7.1 Multi-Mode Variables

**🚨 NOTE:** If you followed Step 1.3-1.5 correctly, you should have already detected multiple modes and obtained user confirmation. This section is a REMINDER of the expected behavior.

If new JSON has multiple modes (e.g., light/dark themes) and you DID NOT ask in Step 1:

**🚨 STOP IMMEDIATELY - You missed the blocking checkpoint!**

Go back to Step 1.3 and follow the mandatory mode detection process:

1. **STOP all work immediately**
2. **List all available modes to the user**
3. **Ask which mode to use** using the required template from Step 1.4
4. **Wait for explicit user confirmation**
5. **Record the confirmed mode**
6. **Then resume the update workflow**

**Required Question Template (from Step 1.4):**
```
🚨 MULTIPLE MODES DETECTED in [collection_name]

I found [X] modes in this collection:
- Mode 1: "[mode_name_1]"
- Mode 2: "[mode_name_2]"
- Mode 3: "[mode_name_3]"

Which mode would you like to use for comparing and updating theme variables?

Please confirm the mode name exactly as shown above.
```

**After Mode Confirmation:**

If the user wants to explore other options beyond single-mode update:

```
✅ User confirmed mode: "[selected_mode_name]"

I will update your theme using the "[selected_mode_name]" mode.

Additional options available:
1. Update using [selected_mode_name] mode only (recommended)
2. Generate separate theme files for each mode
3. Add mode switching support (advanced)

Would you like to proceed with option 1, or explore other options?
```

**Default behavior:** Proceed with option 1 (single mode update) unless user explicitly requests multi-mode support.

### 7.2 Breaking Changes

If a widely-used variable is removed or significantly changed:

**Warning prompt:**
```
"⚠️ Warning: 'spacing.16' changed from 16px to 18px.
This variable is used in 47 files. This may cause visual changes.

Recommendation:
- Review visual impact before applying
- Consider creating a new variable (spacing18) instead
- Keep spacing16 at old value for backward compatibility"
```

### 7.3 Conflicting Collections

**🚨 IMPORTANT:** This is NOT a conflict - this is expected override behavior!

If multiple JSON files define the same variable with different values:

**DO NOT ask the user** - Apply the override rule automatically:

**✅ CORRECT Behavior:**
```
Variable 'color.Red.50' is defined in both files:
- Core_variables.json: #ff6467
- STS_Variables.json: #ff7478

✅ Using Project JSON value: #ff7478 (Project overrides Core)

This is expected behavior - project-specific values customize the core design tokens.
```

**When to Actually Ask User:**

Only ask if there's a REAL conflict (two project-level JSON files with different values):

```
"Conflict detected: 'color.Red.50' is defined in both:
- STS_Variables.json: #ff7478
- Boro_Variables.json: #ff6467

Both are project-level files. Which should take precedence?"
```

**But in normal two-file workflow (Core + Project):**
- ✅ **Always use Project JSON value** - no question needed
- This is documented in the CRITICAL RULES section
- Document the override in comments when updating theme files

---

## Best Practices for AI

### DO:
- ✅ **ALWAYS** stop and ask for mode selection when multiple modes detected
- ✅ **ALWAYS** use user-confirmed mode when extracting values
- ✅ **ALWAYS** apply override rule: Project JSON overrides Core JSON
- ✅ Always present changes for user review before applying
- ✅ Preserve all custom developer additions
- ✅ Add comments indicating Figma source, mode, and override status
- ✅ Document which file values came from (Core vs Project)
- ✅ Handle edge cases gracefully
- ✅ Generate comprehensive reports
- ✅ Update design system rules to stay in sync

### DON'T:
- ❌ **NEVER** auto-select modes without user confirmation
- ❌ **NEVER** use `modes[0]` or hardcoded mode names
- ❌ **NEVER** ask about Core vs Project conflicts (apply override rule automatically)
- ❌ Never auto-remove variables without confirmation
- ❌ Never modify custom developer code
- ❌ Never apply changes without user approval for updates
- ❌ Never assume variable purpose without checking usage
- ❌ Never break existing functionality

### Comment Best Practices:

```typescript
// Good comments - showing source and overrides
spacing16: responsiveHeight(20), // Updated 2025-10-24 from STS_Variables.spacing.16 (mode: STS_base, overrides Core: 16)
spacing18: responsiveHeight(18), // Updated 2025-10-24 from Core_variables.spacing.18 (mode: Value)
purple: { _A100: '#3c0366' }, // Added 2025-10-24 from STS_Variables.color.Purple.A100 (mode: STS_base)

// Custom values should be marked
customButtonHeight: responsiveHeight(44), // Custom - not from Figma
```

### Mode Selection Best Practices:

```typescript
// ❌ WRONG - Auto-selecting mode
const selectedMode = modes[0] // DON'T DO THIS!

// ❌ WRONG - Hardcoded mode name
const value = variable.values["STS_base"] // DON'T DO THIS!

// ✅ CORRECT - Using user-confirmed mode
const userConfirmedMode = "STS_base" // From Step 1.5 user confirmation
const value = variable.values[userConfirmedMode] // CORRECT!
```

---

## Troubleshooting

### Issue: Type Errors After Update

**Solution:**
1. Check for duplicate properties
2. Verify `as const` is present
3. Run `npx tsc --noEmit` to see specific errors
4. Fix based on TypeScript feedback

### Issue: Visual Regressions

**Solution:**
1. Identify which variable changed
2. Check usage with Grep tool
3. Either:
   - Revert the specific value
   - Update components to work with new value
   - Create new variable for backward compatibility

### Issue: Missing Variables

**Solution:**
1. Verify JSON files are complete exports
2. Check if variable was renamed in Figma
3. Ask user if variable should be deprecated or recreated

---

## Summary Checklist

Before completing the update workflow, verify:

- [ ] **All JSON files read successfully** (both Core and Project JSON)
- [ ] **Mode detection performed** (checked for multiple modes in each collection)
- [ ] **User confirmed mode** (if multiple modes existed, obtained explicit confirmation)
- [ ] **Override rule applied** (Project JSON values override Core JSON values)
- [ ] **Used user-confirmed mode** for all value extractions (`variable.values[userConfirmedMode]`)
- [ ] Change report generated and shown to user
- [ ] User approved changes
- [ ] Colors updated (added/modified) using user-confirmed mode
- [ ] Metrics updated (spacing/radius/icon sizes) using user-confirmed mode
- [ ] Typography updated (if changed) using user-confirmed mode
- [ ] Custom values preserved
- [ ] Comments added documenting source, mode, and override status
- [ ] Design system rules updated
- [ ] TypeScript type checking passed
- [ ] Summary report provided to user
- [ ] No breaking changes introduced without warning
- [ ] **No modes auto-selected** (confirmed user was asked if multiple modes existed)
- [ ] **Override documentation added** to comments where Project overrides Core

