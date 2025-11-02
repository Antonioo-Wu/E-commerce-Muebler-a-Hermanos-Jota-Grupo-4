import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../services/api";
import ProductForm from "../../components/ProductForm/ProductForm";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: null,
    precio: "",
    destacado: false,
    detalles: [{ label: "", value: "" }],
    stock: 0,
  });

  const [imagenPreview, setImagenPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const producto = await fetchProductById(id);
        setFormData({
          nombre: producto.nombre || "",
          descripcion: producto.descripcion || "",
          imagen: null, // file not set
          precio: producto.precio || "",
          destacado: !!producto.destacado,
          detalles:
            producto.detalles && producto.detalles.length
              ? producto.detalles
              : [{ label: "", value: "" }],
          stock: producto.stock || 0,
        });
        setImagenPreview(producto.imagen || "");
      } catch (error) {
        console.error(error);
        setErrors({ general: "No se pudo cargar el producto." });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
    } else if (type === "file") {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImagenPreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleDetalleChange = (index, field, value) => {
    const nuevosDetalles = [...formData.detalles];
    nuevosDetalles[index][field] = value;
    setFormData({ ...formData, detalles: nuevosDetalles });
  };

  const agregarDetalle = () => {
    setFormData({
      ...formData,
      detalles: [...formData.detalles, { label: "", value: "" }],
    });
  };

  const eliminarDetalle = (indexAEliminar) => {
    const nuevosDetalles = formData.detalles.filter(
      (_, indiceActual) => indiceActual !== indexAEliminar
    );
    setFormData({ ...formData, detalles: nuevosDetalles });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria.";
    if (!formData.precio || formData.precio <= 0)
      newErrors.precio = "El precio debe ser mayor a 0.";
    if (!imagenPreview && !formData.imagen)
      newErrors.imagen = "Debe seleccionar una imagen.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("precio", formData.precio);
      formDataToSend.append("destacado", formData.destacado);
      formDataToSend.append("stock", formData.stock || 0);
      formDataToSend.append("detalles", JSON.stringify(formData.detalles));

      if (formData.imagen) {
        formDataToSend.append("imagen", formData.imagen);
      }

      await updateProduct(id, formDataToSend);

      setSuccessMessage("Producto actualizado con éxito");
      setTimeout(() => navigate("/productos"), 1000);
    } catch (error) {
      console.error(error);
      setErrors({ general: "Hubo un problema al actualizar el producto." });
    }
  };

  if (loading) return <p>Cargando producto...</p>;

  return (
    <ProductForm
      formTitle="Editar producto"
      formData={formData}
      handleChange={handleChange}
      handleDetalleChange={handleDetalleChange}
      agregarDetalle={agregarDetalle}
      eliminarDetalle={eliminarDetalle}
      imagenPreview={imagenPreview}
      errors={errors}
      successMessage={successMessage}
      onSubmit={handleSubmit}
      submitLabel="Actualizar producto"
    />
  );
}
