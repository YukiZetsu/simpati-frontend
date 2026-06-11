import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, useLocation } from 'react-router-dom';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const location = useLocation(); // Menggantikan usePage() Inertia
    
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {/* Cek apakah URL item sama dengan URL browser saat ini */}
                        <SidebarMenuButton asChild isActive={item.url === location.pathname}>
                            {/* Ganti href menjadi to, dan hapus prefetch */}
                            <Link to={item.url}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}