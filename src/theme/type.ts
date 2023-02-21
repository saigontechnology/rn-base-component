// Define each new component theme under here
interface Hello {
  text?: string
}

// Add you component theme to common theme object
export interface ThemeType {
  light: {
    Hello?: Hello
  }
  dark: {
    Hello?: Hello
  }
}
