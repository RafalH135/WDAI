import type { ReactNode } from "react";

type KoszykProps = {
    children: ReactNode;
}
function Koszyk({ children } : KoszykProps){
    return (
        <div>
            <div className="flex flex-col gap-2">{children}</div>
        </div>
    );
}

export default Koszyk;