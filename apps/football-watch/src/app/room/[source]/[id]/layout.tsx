export default function Layout({children}: {children: React.ReactNode}) {
    return (
        // Width: 100%, or the block's width will shrink to its content
        <div className="md:container mx-auto">
            {children}
        </div>
    )
}