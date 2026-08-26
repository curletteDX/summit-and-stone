# Uniform Developer Guide

A practical guide for developers new to Uniform, using the Summit & Stone project as a reference.

## What Makes Uniform Different?

### Traditional Headless CMS (Contentful, Contentstack)

**Content-first approach** — the CMS only knows about *content*, not presentation.

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Content Types  │ ──▶  │  Fetch Content  │ ──▶  │  Developer Maps │
│  (Blog Post,    │      │  via API        │      │  Content → UI   │
│   Product)      │      │                 │      │  Components     │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

- Authors create **entries** (a blog post, a product)
- Developers **manually decide** which React component renders which content type
- Layout/page structure is **hardcoded** by developers
- Authors can edit content but **not page layout**

```tsx
// Developer must write this mapping
const BlogPage = ({ slug }) => {
  const post = await contentful.getEntry(slug);
  return (
    <Layout>
      <Hero title={post.fields.title} />  {/* Developer chose this */}
      <Body content={post.fields.body} />
    </Layout>
  );
};
```

### Uniform's Approach

**Composition-first approach** — the CMS understands both *content AND components*.

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Component      │ ──▶  │  Authors Build  │ ──▶  │  SDK Renders    │
│  Definitions    │      │  Pages in       │      │  Automatically  │
│  (Hero, Card)   │      │  Visual Canvas  │      │  (1:1 mapping)  │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

- Developers define **components** in Uniform (parameters, slots) AND create matching React components
- Authors **visually build pages** by dragging components into slots
- Uniform returns a **composition** — a JSON tree of component instances
- The SDK **automatically renders** the right component for each node

```tsx
// Developer just registers components once
registerUniformComponent({ type: "hero", component: Hero });
registerUniformComponent({ type: "card", component: Card });

// Uniform SDK handles everything else
const Page = ({ composition }) => (
  <UniformComposition data={composition} />
);
```

### Key Mental Model Shift

| Concept | Contentful/Contentstack | Uniform |
|---------|------------------------|---------|
| **What authors create** | Content entries | Pages (compositions) |
| **Who controls layout** | Developers | Authors (within constraints) |
| **Component awareness** | None — CMS is content-only | Full — components are first-class |
| **Developer's job** | Map content → components | Register components, define slots |
| **Rendering** | Manual | Automatic via SDK |

---

## Developer Advantages

### 1. In-Context Editing (Canvas)

Authors edit **directly on the live preview**, not in disconnected forms.

**Developer benefit**: Fewer "it doesn't look right" tickets — authors see exactly what they're building.

### 2. Guardrails via Slot Constraints

Developers define **what's allowed where** — authors can't break layouts.

```yaml
# From uniform-data/component/featuredProducts.yaml
slots:
  - id: products
    name: Products
    maxComponents: 12
    minComponents: 1
    allowedComponents:
      - productCard
```

**Developer benefit**: No more "the author put 47 images in a row" emergencies.

### 3. Personalization & A/B Testing Built-In

No separate tools needed. Authors add variants directly in Canvas.

**Developer benefit**: You don't build personalization infrastructure — it's already there.

### 4. Component Patterns (Shared Content)

Patterns are **reusable component instances** — update once, reflects everywhere.

**Developer benefit**: No custom "shared content" system to build.

### 5. Zero Backend Code for New Components

Adding a new component is purely additive:

| Step | Traditional CMS | Uniform |
|------|-----------------|---------|
| 1 | Create content type | Create component definition |
| 2 | Create API endpoint | — |
| 3 | Write fetching logic | — |
| 4 | Map to React component | Register React component |
| 5 | Update routing | — |

### 6. Preview Without Deployment

Authors see changes **instantly** — no PR, no deploy, no waiting.

**Developer benefit**: No "deploy preview" pipelines to maintain.

---

## Summit & Stone Code Examples

### 1. The Magic of `UniformComposition`

One catch-all route handles everything (`src/pages/[[...slug]].tsx`):

```tsx
export async function getServerSideProps(context: any) {
  const client = new RouteClient({
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
  });

  const slug = Array.isArray(context.query.slug)
    ? "/" + context.query.slug.join("/")
    : context.query.slug || "/home";

  const compositionFromRoute = await client.getRoute({
    path: slug,
    state: context.preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
    locale: "en-US",
  });

  return {
    props: {
      composition: compositionFromRoute.compositionApiResponse.composition,
    },
  };
}

export default function Home({ composition }) {
  return (
    <UniformComposition data={composition}>
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <UniformSlot name="content" />
      </div>
    </UniformComposition>
  );
}
```

**Key insight**: `UniformComposition` + `UniformSlot` automatically renders whatever components authors placed in Canvas.

### 2. Component Registration (`src/uniform/components.ts`)

The bridge between Uniform definitions and React components:

```tsx
import { registerUniformComponent } from "@uniformdev/canvas-react";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
// ... more imports

registerUniformComponent({
  type: "herosection",
  component: HeroSection,
});

registerUniformComponent({
  type: "featuredProducts",
  component: FeaturedProducts,
});

// ... more registrations
```

**Without Uniform**, you'd write this manually:

```tsx
// ❌ Traditional approach
function renderComponent(component) {
  switch (component.type) {
    case 'herosection': return <HeroSection {...component.fields} />;
    case 'featuredProducts': return <FeaturedProducts {...component.fields} />;
    // ... repeat for every component
  }
}
```

### 3. Slots = Nested Components (`src/components/FeaturedProducts.tsx`)

```tsx
import { UniformText, UniformSlot } from "@uniformdev/canvas-react";

export default function FeaturedProducts() {
  return (
    <section className="font-sans px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <UniformText
          placeholder="Our Top Picks"
          parameterId="heading"
          as="h2"
          className="text-3xl font-bold"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <UniformSlot name="products" />
        </div>
      </div>
    </section>
  );
}
```

The Uniform definition enforces constraints:

```yaml
# uniform-data/component/featuredProducts.yaml
slots:
  - id: products
    maxComponents: 12
    minComponents: 1
    allowedComponents:
      - productCard
```

**Developer benefit**: Authors can only add `productCard` components (1-12 of them).

### 4. In-Context Editing with `UniformText`

From `src/components/HeroSection.tsx`:

```tsx
<UniformText
  placeholder="title content goes here"
  parameterId="title"
  as="h1"
  className="text-5xl font-bold text-white"
/>
<UniformText
  placeholder="subtitle content goes here"
  parameterId="subtitle"
  as="p"
  className="text-xl text-zinc-300 mt-4"
/>
```

**What this gives you**:
- Authors click directly on text in Canvas and edit it
- Placeholder shows when empty (guides authors)
- `parameterId` links to the Uniform component parameter

### 5. The Page Shell Pattern (`src/components/Page.tsx`)

```tsx
import { UniformSlot } from "@uniformdev/canvas-react";

function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black">
      <main className="flex-1 w-full">
        <UniformSlot name="content" />
      </main>
    </div>
  );
}

export default Page;
```

**The power**: Authors build entire pages inside that `content` slot:
- Home page: Hero → FeaturedProducts → LatestArticles
- Blog page: BlogArticleIntro → BlogArticleDetail
- Product page: Hero → TopicCards → FeaturedProducts

**Same code, infinite layouts** — controlled by authors, constrained by slot rules.

---

## Summary

| What You Build | Lines of Code | What It Enables |
|----------------|---------------|-----------------|
| `[[...slug]].tsx` | ~30 lines | Handles ALL routes automatically |
| `components.ts` | ~70 lines | Registers all components once |
| `Page.tsx` | 13 lines | Shell for unlimited page layouts |
| Component with slot | ~36 lines | Reusable section with constraints |

**Total framework code**: ~150 lines

**What authors can now do**: Build unlimited pages, rearrange components, edit content live — without any developer involvement.

---

## Quick Pitch for Skeptical Devs

> "Think of Uniform as React component props, but the CMS understands them. Authors fill in props visually, the SDK renders automatically. You define the components and constraints once — authors build infinitely within those rails."

---

## When to Use Which

- **Contentful/Contentstack**: Content is king, layout is fixed, developers own presentation
- **Uniform**: Authors need layout flexibility, component-driven pages, visual editing
