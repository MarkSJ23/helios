"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { Button } from "./ui/button";

const links = [
  { name: "Home", href: "/" },
  { name: "Diet", href: "/diet" },
  { name: "Routine", href: "/routine" },
  { name: "Leaderboards", href: "/leaderboards" },
  { name: "Contact us", href: "/contact" },
];

export default function Navbar() {
  //TODO: Add Logo
  return (
    <NavigationMenu className="flex min-w-full grow-0 text-3xl">
      <NavigationMenuList>
        {links.map((link, index) => (
          <NavigationMenuItem key={index}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink asChild>
                <Button variant="ghost" className="text-lg">
                  {link.name}
                </Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
