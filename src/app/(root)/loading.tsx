import PostSkeleton from '@/components/shared/PostSkeleton'
import React, { ReactNode } from 'react'


interface LoadingProps {
    title?: string;
    children?: ReactNode; // Define children prop as ReactNode
}
const Loading:React.FC<LoadingProps> = ({title='Home',children}) => {
    return (
        <>
            <h1 className="head-text text-left mb-10">{title}</h1>

            {children ? (
                // Render the children component if it's provided
                children
            ) : (
                // Render the PostSkeleton component if children is not provided
                <PostSkeleton />
            )}

        </>
    )
}

export default Loading;
