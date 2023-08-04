# Text Component

React Native Base Text Component

This component extends from React Native Text
with some variants

## Usage

```js
import {Text, TextBold, TextItalic} from 'rn-base-component';

<Text> Text font normal </Text>
<TextBold> Text font bold </TextBold>
<TextItalic> Text font italic </TextItalic>
```


## Default Props

| Variant |                                         Default Props                                          |
|:-------:|:----------------------------------------------------------------------------------------------:|
|  Text   | fontSize: metrics.span <br/>color: colors.black<br/>fontFamily:  typography.fonts.regular<br/> |
|  Bold   |                             fontFamily:      typography.fonts.bold                             |
| Italic  |                                      fontStyle:    italic                                      |

---

