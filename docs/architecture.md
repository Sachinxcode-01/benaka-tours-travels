# Feature-Sliced Design (FSD) Architecture

This project strictly adheres to standard Feature-Sliced Design rules:

```
app → pages → widgets → features → entities → shared
```

## Layer Responsibilities

1. **`app/`**: Root providers, routing configuration, global styles, tokens, and entry points.
2. **`pages/`**: Route-level compositions. Contains clean, lightweight page shells.
3. **`widgets/`**: Composed UI layouts such as Header, Footer, PageShell, MobileActionBar.
4. **`features/`**: User interaction logic (booking inquiries, fleet filtering, direct contact).
5. **`entities/`**: Domain models and verified static datasets (business, vehicle, service, testimonial, faq).
6. **`shared/`**: Atomic UI components (`Button`, `Card`, `Modal`, etc.), utilities (`cn`, `createSlug`), services (`whatsapp.service`, `phone.service`), hooks, and constants.

## Boundary Rules

- Higher layers can import lower layers. Lower layers MUST NOT import higher layers.
- Cross-imports within the same slice are permitted only through public `index.ts` exports.
- No inline business facts or phone numbers inside shared UI components.
