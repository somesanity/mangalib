import React, { useRef, useState } from 'react';

import classes from './NewTitlePage.module.css';

export const NewTitlePage = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [titleName, setTitleName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedExtensions = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedExtensions.includes(file.type)) {
            setError('Файл должен быть JPG, PNG или WEBP.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target?.result as string;

            image.onload = () => {
                if (image.width !== 150 || image.height !== 250) {
                    setError('Обложка должна быть 150x250');
                    return;
                }

                setError(null);
                setCoverImage(image.src);
                setSelectedFile(file);
            };
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
            if (!selectedFile) {
        console.error('Файл не выбран');
        return;
    }

        const formData = new FormData();
        formData.append('title_name', titleName);
        formData.append('cover_image', selectedFile);
        
        try {
            const response = await fetch('http://localhost:2000/title', {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            console.log('Ответ сервера:', data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    
    return (
        <div className="container">
            <div className={classes.addTitleFormWrapper}>
                <form className={classes.addTitleForm} onSubmit={handleSubmit}>
                    <div onClick={handleClick} className={classes.addCover}>
                        <input
                            className={classes.addCoverInput}
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {coverImage ? (
                            <img src={coverImage} alt="Загруженная обложка" className={classes.coverImage} />
                        ) : (
                            <>
                                <span>+</span>
                                <span>Загрузите обложку</span>
                                {error && <span>{error}</span>}
                            </>
                        )}
                    </div>
                    <input
                        className={classes.TitleNameInput}
                        placeholder="Название манги"
                        type="text"
                        value={titleName}
                        onChange={(e) => setTitleName(e.target.value)}
                    />
                    <input className={classes.CreateNewTitleSubmit} type="submit" value="Добавить мангу" />
                </form>
            </div>
        </div>
    );
};
