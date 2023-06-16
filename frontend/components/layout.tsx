import FileUploader from './ui/file-uploader';
import Footer from './ui/footer';
import Header from './ui/header';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <Header />

      <div className="flex flex-col lg:flex-row">
        <main className="w-full lg:w-4/5 flex-grow overflow-hidden">
          {children}
        </main>
        <div className="w-full lg:w-1/5 mb-4 lg:mb-0 lg:mr-4">
          <FileUploader />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
