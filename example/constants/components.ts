/**
 * Component Library Demo Constants
 * List of all components available in the demo app
 */

export interface ComponentItem {
  id: string
  name: string
  description: string
  route?: string
  icon: string
  category: 'Input' | 'Display' | 'Navigation' | 'Feedback'
  status: 'Complete' | 'Coming Soon'
}

export const COMPONENTS: ComponentItem[] = [
  {
    id: 'code-input',
    name: 'CodeInput',
    description: 'Verification code input with multiple styling options',
    route: '/code-input',
    icon: '🔢',
    category: 'Input',
    status: 'Complete',
  },
  {
    id: 'text-input',
    name: 'TextInput',
    description: 'Text input fields with flat and outlined variants',
    icon: '📝',
    category: 'Input',
    status: 'Coming Soon',
  },
  {
    id: 'button',
    name: 'Button',
    description: 'Various button styles and variants',
    icon: '🔘',
    category: 'Input',
    status: 'Coming Soon',
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'Checkboxes with customizable styles',
    icon: '☑️',
    category: 'Input',
    status: 'Coming Soon',
  },
  {
    id: 'radio-button',
    name: 'RadioButton',
    description: 'Radio button selections',
    icon: '🔘',
    category: 'Input',
    status: 'Coming Soon',
  },
  {
    id: 'slider',
    name: 'Slider',
    description: 'Range and fixed sliders',
    icon: '🎚️',
    category: 'Input',
    status: 'Coming Soon',
  },
  {
    id: 'card',
    name: 'Card',
    description: 'Card container component',
    icon: '🃏',
    category: 'Display',
    status: 'Coming Soon',
  },
  {
    id: 'text',
    name: 'Text',
    description: 'Themed text component',
    icon: '📄',
    category: 'Display',
    status: 'Coming Soon',
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Typography styles and variants',
    icon: '✍️',
    category: 'Display',
    status: 'Coming Soon',
  },
  {
    id: 'icon',
    name: 'Icon',
    description: 'Icon component system',
    icon: '⭐',
    category: 'Display',
    status: 'Coming Soon',
  },
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'Expandable accordion panels',
    icon: '📋',
    category: 'Navigation',
    status: 'Coming Soon',
  },
  {
    id: 'progress',
    name: 'Progress',
    description: 'Progress indicators and bars',
    icon: '📊',
    category: 'Feedback',
    status: 'Coming Soon',
  },
  {
    id: 'countdown',
    name: 'CountDown',
    description: 'Countdown timer component',
    icon: '⏱️',
    category: 'Feedback',
    status: 'Coming Soon',
  },
]

// Helper functions
export const getComponentById = (id: string): ComponentItem | undefined => {
  return COMPONENTS.find(component => component.id === id)
}

export const getComponentsByCategory = (category: ComponentItem['category']): ComponentItem[] => {
  return COMPONENTS.filter(component => component.category === category)
}

export const getCompletedComponents = (): ComponentItem[] => {
  return COMPONENTS.filter(component => component.status === 'Complete')
}

export const getComponentsByStatus = (status: ComponentItem['status']): ComponentItem[] => {
  return COMPONENTS.filter(component => component.status === status)
}
