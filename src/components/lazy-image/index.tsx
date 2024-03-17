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

const LazyImage: FC<LazyImageProps> = ({ placeholder, src, className, width, height, alt }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [viewSrc, setViewSrc] = useState<string>('');

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setViewSrc(src);
                observer.unobserve(imgRef.current as any);
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
                className={isLoading ? 'hidden' : className}
                onLoad={() => setIsLoading(false)}
                alt={alt}
            />
        </Fragment>
    )
}

export { LazyImage }