'use client'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { CategoryNavigation } from '../product-navigation/category-navigation'
import { CategoryItem } from '../queries/fetchCategories'

type MobileFiltersProps = {
  categories: CategoryItem[]
  categoryId?: string
}

export const CategoryDrawer: React.FC<MobileFiltersProps> = ({
  categories,
  categoryId,
}: MobileFiltersProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>
        <ChevronDown className="mr-2" />
        Kategorie
      </Button>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="flex items-center flex-col">
            <DialogTitle>Kategorie</DialogTitle>
            <DialogDescription>Wybierz kategorię, aby przeglądać produkty.</DialogDescription>
          </DrawerHeader>
          <div className="pl-4">
            <CategoryNavigation categories={categories} categoryId={categoryId} className="flex" />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost" aria-label="Close drawer">
                Zamknij
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
