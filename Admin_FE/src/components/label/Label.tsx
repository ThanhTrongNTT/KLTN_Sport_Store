import classNames from '@/utils/classNames';
type PropTypes = {
    htmlFor: string;
    children: any;
    className: string;
    color?: string;
};
const Label = ({ htmlFor, className, children, color }: PropTypes) => {
    return (
        <div className='inline-block'>
            <label
                htmlFor={htmlFor}
                className={classNames(
                    'inline-block cursor-pointer text-sm dark:text-c4 font-semibold !bg-transparent',
                    className,
                    color ? color : 'text-c3',
                )}
            >
                {children}
            </label>
        </div>
    );
};

export default Label;
