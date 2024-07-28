import { Pet } from '../types/data';

const transformPetData = (data: any): Pet => {
    return {
        id: data.id,
        ...data.attributes,
        image: data.attributes.image?.data?.attributes?.url
            ? `http://localhost:1337${data.attributes.image.data.attributes.url}`
            : null,
    };
};

export default transformPetData;
