import React, { useState } from 'react'
import type { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

export default function useHome() {
     const isDark = useSelector((state: RootState ) => state.dark.value);

  const [contentHome, setContentHome] = useState  ({
    eng: "",
    ar: ""
  });

  const [title, setTitle] = useState({
    eng: "",
    ar: ""
  });

  const handleTitleChange = (lang: "eng" | "ar", value: string) => {
    setTitle({ ...title, [lang]: value });
  };

  const handleContentChange = (lang: "eng" | "ar", value: string) => {
    setContentHome({ ...contentHome, [lang]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted title:", title);
    console.log("Submitted content:", contentHome);
  };
  return (
   {isDark, contentHome, setContentHome, title, setTitle, handleTitleChange, handleContentChange, handleSubmit}
  )
}
