type DialogProps = {
    id: string;
};

function Dialog({ id }: DialogProps) {
    return (
        <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)]'>
            <div className='flex items-center justify-center absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                <h3 className='text-white'>{id}</h3>
                <button className='bg-danger'>Yes</button>
                <button className='bg-success'>No</button>
            </div>
        </div>
    );
}

export default Dialog;
