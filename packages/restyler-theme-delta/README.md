# restyler-theme-delta 🖌️

This is a theme for [Restyler](https://github.com/albnnc/restyler)
used in various Delta Solutions projects.

To use this theme, one should add it to `SystemContainer` props:

```jsx
import { SystemContainer } from 'restyler';
import { theme } from 'restyler-theme-delta';

export default App = () => {
  return (
    <SystemContainer
      theme={theme}
      // ... 
    >
      {/* ... */}
    </SystemContainer>
  )
}
```
