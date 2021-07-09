import CreateOrEditProduct from "../../../../components/Forms/Product/CreateOrEdit";
import AdminLayout from "../../../../layout/AdminLayout";
import "./index.css";

const Index = () => {  
  return (
    <>
      <AdminLayout>
        <div className="container mt-12 mx-auto">
          <span className="text-2xl text-barbina-brown mx-4 pr-2 add-product-title-underline">
            Criar novo produto
          </span>
          <CreateOrEditProduct datas={{}} />
        </div>
      </AdminLayout>
    </>
  );
};

export default Index;