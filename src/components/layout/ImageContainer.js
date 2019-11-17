import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ImageContainer = (props) => {
    const { width, height, alt, src, ...rest } = props;
    return (
        <LazyLoadImage alt={alt} height={height} src={src} width={width} effect="blur" {...rest} />
    );
};

ImageContainer.defaultProps = {
    width: null,
    height: null
};
ImageContainer.propTypes = {
    height: PropTypes.string,
    src: PropTypes.string.isRequired,
    width: PropTypes.string,
    alt: PropTypes.string.isRequired
};

export default ImageContainer;
