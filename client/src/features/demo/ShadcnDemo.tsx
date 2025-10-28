// Example page showing how to use shadcn/ui components
// This file can be deleted - it's just for demonstration

import { Button } from "@/components/ui/button"

export default function ShadcnDemo() {
  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">shadcn/ui is Ready! 🎉</h1>
          <p className="text-muted-foreground">
            Your project is now configured with shadcn/ui and ready for v0.dev integration
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Button Examples</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🚀</Button>
          </div>
        </div>

        <div className="p-6 border rounded-lg space-y-2">
          <h2 className="text-2xl font-semibold">Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              Visit{" "}
              <a
                href="https://v0.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                v0.dev
              </a>{" "}
              to generate UI components with AI
            </li>
            <li>
              Add more components: <code className="bg-muted px-2 py-1 rounded">npm run ui:add card</code>
            </li>
            <li>
              Check{" "}
              <a
                href="https://ui.shadcn.com/docs/components"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                shadcn/ui docs
              </a>{" "}
              for available components
            </li>
            <li>Read SHADCN_SETUP.md for complete documentation</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
