import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { GetCover } from '../../../Axios/GetCover';



import classes from './NewChapterPage.module.css';
import { Button } from '@mui/material';

export const NewChapterPage = () => {
  const { id, chapterid } = useParams<string>();

  const [cover, setCover] = useState<string>();
  const [inputs, setInputs] = useState<{ id: number; file: File | null }[]>([
    { id: Date.now(), file: null }
  ]);
  const [inputImages, setInputImages] = useState<{ id: number; url: string }[]>([]);

  // Объект с рефами для каждого input
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const getCover = async () => {
    const data = await GetCover(id);
    if (data) {
      setCover(data);
    }
  };

  const uploadPages = async () => {
    if (inputs.length === 0 || inputs.every((input) => input.file === null)) {
      alert('Выберите файлы для загрузки');
      return;
    }
  
    const formData = new FormData();
  
    inputs.forEach((input) => {
      if (input.file) {
        formData.append('pages', input.file);
      }
    });
  
    try {
      const response = await fetch(`http://localhost:2000/title/${id}/chapter/${chapterid}/pages`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error('Ошибка загрузки страниц');
  
      const result = await response.json();
      console.log(result);
      alert('Страницы успешно загружены');
    } catch (error) {
      console.error(error);
      alert('Ошибка загрузки страниц');
    }
  };
  

  useEffect(() => {
    getCover();
  }, []);

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setInputImages((prev) => [
        ...prev,
        { id: inputs[index].id, url: e.target?.result as string }
      ]);
    };
    reader.readAsDataURL(file);

    const newInputs = [...inputs];
    newInputs[index].file = file;
    setInputs([...newInputs, { id: Date.now(), file: null }]); // Добавляем новый инпут
  };

  const inputClickHandler = (id: number) => {
    inputRefs.current[id]?.click(); // Открываем конкретный input
  };

  return (
    <div className={classes.NewChapterPageWrapper}>
      <img src={cover} alt="" />
      <p>Глава {chapterid}</p>

      <div>
        <form action="">
          {inputs.map((input, index) => (
            <div key={input.id} className={classes.inputBox} onClick={() => inputClickHandler(input.id)}>
              <p>+</p>
              <p>Страница {index + 1}</p>
              {/* Отображаем изображение, если оно загружено */}
              {inputImages.find((img) => img.id === input.id) && (
                <img src={inputImages.find((img) => img.id === input.id)?.url} alt="" />
              )}
              <input
                ref={(el) => (inputRefs.current[input.id] = el)} // Присваиваем реф каждому input
                type="file"
                onChange={(e) => handleFileChange(index, e)}
                style={{ display: 'none' }} // Скрываем input
              />
            </div>
          ))}

        <Button variant="outlined" onClick={uploadPages}>
          Загрузить страницу(ы)
        </Button>

        </form>
      </div>
    </div>
  );
};
