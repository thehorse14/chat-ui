// app/page.tsx
import FileUploadForm from "@/components/FileUploadForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main className="flex min-h-screen p-24">
      <FileUploadForm />
      <ToastContainer />
    </main>
  );
}
