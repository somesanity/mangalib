CREATE TABLE Tags (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Title (
    id SERIAL PRIMARY KEY,
    title_name VARCHAR(255) NOT NULL,
    title_cover VARCHAR(255) NOT NULL
);
CREATE TABLE TitleTags (
    title_id INT REFERENCES Title(id) ON DELETE CASCADE,
    tag_id INT REFERENCES Tags(id) ON DELETE CASCADE,
    PRIMARY KEY (title_id, tag_id)
);

CREATE TABLE Chapters (
    id SERIAL PRIMARY KEY,
    title_id INT REFERENCES Title(id) ON DELETE CASCADE,
    chapter_number INT NOT NULL,
    chapter_title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Pages (
    id SERIAL PRIMARY KEY,
    chapter_id INT REFERENCES Chapters(id) ON DELETE CASCADE,
    page_number INT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);