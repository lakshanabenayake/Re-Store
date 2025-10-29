import { ShoppingCart, Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Link, NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/store"
import { setDarkMode } from "./uiSlice"
import { useFetchBasketQuery } from "../../features/basket/basketApi"
import { cn } from "@/lib/utils"

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

export default function Navbar() {
  const { isLoading, darkMode } = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()
  const { data: basket } = useFetchBasketQuery()

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo and Theme Toggle */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="text-xl font-semibold tracking-tight">RE-STORE</div>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => dispatch(setDarkMode())}
              className="ml-2"
            >
              {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-yellow-500" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {midLinks.map(({ title, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )
                }
              >
                {title.toUpperCase()}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="icon"
              asChild
              className="relative"
            >
              <Link to="/basket">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center gap-1">
              {rightLinks.map(({ title, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  {title.toUpperCase()}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-6 mt-8">
                  {midLinks.map(({ title, path }) => (
                    <NavLink
                      key={path}
                      to={path}
                      className={({ isActive }) =>
                        cn(
                          "text-lg font-medium transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                        )
                      }
                    >
                      {title.toUpperCase()}
                    </NavLink>
                  ))}
                  <div className="border-t pt-6">
                    {rightLinks.map(({ title, path }) => (
                      <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                          cn(
                            "block py-2 text-lg font-medium transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                          )
                        }
                      >
                        {title.toUpperCase()}
                      </NavLink>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Loading Progress Bar */}
      {isLoading && (
        <div className="fixed top-16 left-0 right-0 z-50 h-1">
          <div className="h-full w-full bg-primary/20">
            <div className="h-full bg-primary animate-[progress_1s_ease-in-out_infinite]" style={{
              width: '40%',
              animation: 'progress 1s ease-in-out infinite'
            }} />
          </div>
        </div>
      )}
    </>
  )
}
