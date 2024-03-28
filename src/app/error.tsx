'use client';

export default function Error({ error }: { error: Error }) {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <h2 className=" text-4xl font-bold text-destructive">Something Went Wrong!</h2>
        </div>
    );
}
