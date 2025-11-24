import { ImageOff } from 'lucide-react';

const NotExistImage = () => {
    return (
        <div className="w-full h-full overflow-hidden rounded-lg flex items-center justify-center skeleton">
            <ImageOff className="w-10 h-10 text-gray-400" />
        </div>
    );
};

export default NotExistImage;
