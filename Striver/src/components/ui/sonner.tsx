
import { useTheme } from "next-themes"

import { Toaster as Sonner,type ToasterProps} from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme = "dark" } = useTheme()

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": resolvedTheme ? "#000000" : "#ffffff",
            "--normal-text": resolvedTheme ? "#ffffff" : "#000000",
          "--normal-border": "var(--border)",
       
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster}
