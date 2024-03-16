import * as React from 'react'
import { useEffect, useRef, useState, FC, Fragment } from 'react'
type LazyImageProps = {
    placeholder: string;
    src: string;
    className?: string;
    width?: string;
    height?: string;
    alt?: string;
}

const LazyImage: FC<LazyImageProps> = ({ placeholder, src, className, width, height, alt }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [viewSrc, setViewSrc] = useState<string>('');

    const imgRef = useRef<any>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setViewSrc(src);
                observer.unobserve(imgRef.current);
            }
        });

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }
    }, []);


    return (
        <Fragment>
            {isLoading && (
                <img
                    ref={imgRef}
                    src={placeholder}
                    width={width}
                    height={height}
                    alt={alt}
                />
            )}

            <img
                src={viewSrc}
                width={width}
                height={height}
                className={className}
                onLoad={() => setIsLoading(false)}
                alt={alt}
            />
        </Fragment>
    )
}

export { LazyImage }