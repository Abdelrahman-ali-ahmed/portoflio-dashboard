import React, { useEffect, useState } from 'react';
import type { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import {  doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { fetchHomeData } from './fetchHomeData';

export default function useHome() {
  const isDark = useSelector((state: RootState) => state.dark.value);

  const [contentHome, setContentHome] = useState({
    eng: '',
    ar: ''
  });

  const [title, setTitle] = useState({
    eng: '',
    ar: ''
  });

   useEffect(() => {
  const loadData = async () => {
    const data = await fetchHomeData();
    if (data) {
      setContentHome(data.content);
      setTitle(data.title);
    } else {
      console.warn("No data found in /content/home.");
    }
  };

  loadData();
}, []);


console.log(contentHome,title);

  const handleTitleChange = (lang: 'eng' | 'ar', value: string) => {
    setTitle({ ...title, [lang]: value });
  };

  const handleContentChange = (lang: 'eng' | 'ar', value: string) => {
    setContentHome({ ...contentHome, [lang]: value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const homeRef = doc(db, "content", "home");
    await updateDoc (homeRef, {
      title,
      content: contentHome,
    });
    alert("Data updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

  return {
    isDark,
    contentHome,
    setContentHome,
    title,
    setTitle,
    handleTitleChange,
    handleContentChange,
    handleSubmit
  };
}
