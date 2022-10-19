CREATE TABLE Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    first_name: VARCHAR(255),
    last_name: VARCHAR(255),
    email: VARCHAR(255),
    username: VARCHAR(30),
    password: VARCHAR,
    token: VARCHAR,
);

CREATE TABLE Spots( 
    id: INTEGER PRIMARY KEY AUTOINCREMENT,
    ownerId: INTEGER REFERENCES Users(id), 
    address: VARCHAR(255),
    city: VARCHAR(255),
    state: VARCHAR(255),
    country: VARCHAR(255),
    lat: DECIMAL(9,6),
    lng: DECIMAL(9,6),
    name: VARCHAR(255), 
    description: VARCHAR(255),
    price: DECIMAL,
    created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at: DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    avgRating: DECIMAL, 
    previewImg: VARCHAR REFERENCES SpotImages(url)    
);

CREATE TABLE SpotImages(
    id: INTEGER PRIMARY KEY AUTOINCREMENT,
    url: VARCHAR, 
    preview: BOOLEAN,
    spotID: INTEGER REFERENCES Spots(id)
);

CREATE TABLE Reviews(
    id: INTEGER PRIMARY KEY AUTOINCREMENT, 
    userId: INTEGER REFERENCES Users(id),
    spotId: INTEGER REFERENCES Spots(id),
    review: VARCHAR(255),
    created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at:DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
);

CREATE TABLE Images(
    id: INTEGER PRIMARY KEY AUTOINCREMENT, 
    url: VARCHAR,
    reviewId: INTEGER REFERENCES Reviews(id),
    spotId: INTEGER REFERENCES Spots(id)
);

CREATE TABLE Bookings(
    id: INTEGER PRIMARY KEY AUTOINCREMENT, 
    spotId: INTEGER REFERENCES Spots(id),
    start_date: DATE,
    end_date: DATE
);
