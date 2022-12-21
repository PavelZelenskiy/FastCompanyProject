import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import qualitiesService from '../../services/qualities.service';
import { toast } from 'react-toastify';

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    // console.log(qualities);

    useEffect(() => {
        const getQualitiesList = async () => {
            try {
                const { content } = await qualitiesService.fetchAll();
                setQualities(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getQualitiesList();
    }, []);

     const getQuality = (id) => {
         return qualities.find((q) => q._id === id);
     };

     useEffect(() => {
         if (error !== null) {
             toast(error);
             setError(null);
         }
     });

     function errorCatcher(error) {
         const { message } = error.response.data;
         setError(message);
     }

     return (
         <QualitiesContext.Provider
             value={{ isLoading, qualities, getQuality }}
         >
             {children}
         </QualitiesContext.Provider>
     );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
