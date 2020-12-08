import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url }) => (
    <div className="card-img">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={`${item.name}`} className="mb-3"
            style={{ height: 250, width: 250 }}
        />
    </div>
);

export default ShowImage;