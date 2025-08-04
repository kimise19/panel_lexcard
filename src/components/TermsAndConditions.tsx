import { FC } from "react";
import logo from "/logo.webp";

const TermsAndConditions: FC = () => {
  return (
    <div className="mx-4 my-4">
      <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="CopyXpress Logo"
              className="h-60 mx-auto mb-8"
            />
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              Términos y Condiciones de CopyXpress
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Última actualización: 5 de octubre de 2023
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead text-gray-800 dark:text-gray-200">
              Bienvenido a CopyXpress, una aplicación de comercio electrónico
              que ofrece servicios de impresión y venta de productos de
              papelería. Al utilizar nuestra aplicación, aceptas los siguientes
              términos y condiciones. Por favor, léelos detenidamente.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                1. Aceptación de los Términos
              </h2>
              <p className="text-gray-800 dark:text-gray-200">
                Al crear una cuenta, iniciar sesión o realizar cualquier pedido
                a través de CopyXpress, aceptas cumplir con estos términos y
                condiciones. Si no estás de acuerdo con alguna parte de estos
                términos, no deberás utilizar nuestra aplicación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                2. Registro y Cuenta de Usuario
              </h2>
              <p className="text-gray-800 dark:text-gray-200">
                Para realizar pedidos o comprar productos, deberás registrarte
                proporcionando información veraz y actualizada. Eres responsable
                de mantener la confidencialidad de tu cuenta y contraseña.
                CopyXpress no será responsable de cualquier pérdida o daño
                resultante de un acceso no autorizado a tu cuenta.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                3. Servicios Ofrecidos
              </h2>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                3.1. Pedidos de Impresión
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                Puedes cargar archivos a través de la aplicación para realizar
                pedidos de impresión. Es tu responsabilidad asegurarte de que
                los archivos cargados sean correctos y estén en el formato
                adecuado. CopyXpress no se hace responsable por errores en la
                calidad de impresión derivados de archivos incorrectos o
                defectuosos.
              </p>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                3.2. Venta de Productos Físicos
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                También ofrecemos la venta de productos de papelería. Todos los
                productos están sujetos a disponibilidad y pueden variar sin
                previo aviso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                4. Pagos
              </h2>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                4.1. Contra Entrega
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                Puedes optar por realizar el pago contra entrega de tus pedidos.
                El pago se realizará en efectivo o mediante tarjeta de crédito o
                débito en el momento de la entrega del producto o servicio.
              </p>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                4.2. Tarjeta de Crédito o Débito
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                Aceptamos pagos con tarjeta de crédito o débito a través de
                plataformas de pago seguras. Al realizar un pago con tarjeta,
                autorizas a CopyXpress a cargar el monto total de la
                transacción.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                5. Ubicación y Envío
              </h2>
              <p className="text-gray-800 dark:text-gray-200">
                Al utilizar CopyXpress, solicitamos acceso a la ubicación de tu
                dispositivo para procesar tu dirección de envío. Es tu
                responsabilidad asegurarte de que la dirección proporcionada sea
                correcta. CopyXpress no se responsabiliza por retrasos o
                problemas en la entrega debido a direcciones incorrectas o
                incompletas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                6. Política de Devoluciones y Reembolsos
              </h2>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                6.1. Pedidos de Impresión
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                Dado que los pedidos de impresión son personalizados, no se
                aceptan devoluciones ni reembolsos, salvo en casos de defectos
                evidentes en la impresión atribuibles a CopyXpress.
              </p>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                6.2. Productos Físicos
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                Los productos de papelería podrán ser devueltos dentro de los 7
                días posteriores a la entrega, siempre y cuando se encuentren en
                su estado original y sin usar. El reembolso será procesado
                después de recibir y verificar el estado del producto devuelto.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                7. Privacidad
              </h2>
              <p className="text-gray-800 dark:text-gray-200">
                La información personal que recopilemos (incluyendo tu
                ubicación) se tratará de acuerdo con nuestra Política de
                Privacidad, la cual describe cómo recopilamos, utilizamos y
                protegemos tus datos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                8. Propiedad Intelectual
              </h2>
              <p className="text-gray-800 dark:text-gray-200">
                Todo el contenido de la aplicación CopyXpress, incluyendo, entre
                otros, textos, gráficos, logotipos, imágenes y software, es
                propiedad de CopyXpress y está protegido por las leyes de
                propiedad intelectual.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                9. Modificaciones a los Términos
              </h2>
              <p className="text-gray-800 dark:text-gray-200">
                Nos reservamos el derecho de modificar estos términos y
                condiciones en cualquier momento. Los cambios se publicarán en
                la aplicación, y el uso continuado de la aplicación después de
                dichos cambios constituirá tu aceptación de los nuevos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                10. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-800 dark:text-gray-200">
                CopyXpress no será responsable por cualquier daño indirecto,
                incidental o consecuente que resulte del uso de la aplicación o
                de los productos y servicios adquiridos a través de ella.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                11. Contacto
              </h2>
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                Si tienes alguna pregunta o inquietud acerca de estos términos y
                condiciones, puedes contactarnos en:
              </p>
              <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
                <li>Correo electrónico: soporte@copyxpress.com</li>
                <li>Teléfono: +593997703143</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
