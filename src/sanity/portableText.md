# Custom Portable Text Components

## Overview
Custom Portable Text components allow you to define how specific block and inline content types are rendered in your Sanity portable text fields.

## Basic Setup

```typescript
import { PortableText } from '@portabletext/react';

const components = {
    types: {
        // Custom block types
        customBlock: ({ value }) => <div>{value.content}</div>,
    },
    marks: {
        // Custom inline marks
        customMark: ({ children }) => <span className="custom">{children}</span>,
    },
};

export default function MyContent({ content }) {
    return <PortableText value={content} components={components} />;
}
```

## Component Structure

### Block Components
Handle block-level content types:
- `types`: Custom block types
- `block`: Default paragraph blocks

### Inline Components
Handle inline content:
- `marks`: Text formatting (bold, italic, links, etc.)
- `list`: List rendering
- `listItem`: Individual list items

## Common Patterns

### Custom Image Block
```typescript
types: {
    image: ({ value }) => (
        <img src={value.asset.url} alt={value.alt} />
    ),
}
```

### Custom Link Mark
```typescript
marks: {
    link: ({ value, children }) => (
        <a href={value.href}>{children}</a>
    ),
}
```

## Best Practices
- Keep components lightweight
- Validate value props
- Use semantic HTML
- Handle missing data gracefully
