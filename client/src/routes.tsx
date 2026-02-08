import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import { UserGroup } from "./auth/groups";
import DepartamentoPage from "./pages/Departamento/DepartamentoPage";
import DepartamentoForm from "./pages/Departamento/DepartamentoForm";
import CursoPage from "./pages/Curso/CursoPage";
import CursoForm from "./pages/Curso/CursoForm";
import PalavraChavePage from "./pages/PalavraChave/PalavraChavePage";
import PalavraChaveForm from "./pages/PalavraChave/PalavraChaveForm";
import TrabalhoPage from "./pages/Trabalho/TrabalhoPage";
import TrabalhoForm from "./pages/Trabalho/TrabalhoForm";
import ArquivoPage from "./pages/Arquivo/ArquivoPage";
import ArquivoForm from "./pages/Arquivo/ArquivoForm";
import PessoaPage from "./pages/Pessoa/PessoaPage";
import PessoaForm from "./pages/Pessoa/PessoaForm";
import ParticipacaoTrabalhoPage from "./pages/ParticipacaoTrabalho/ParticipacaoTrabalhoPage";
import ParticipacaoTrabalhoForm from "./pages/ParticipacaoTrabalho/ParticipacaoTrabalhoForm";
import UsuarioPage from "./pages/Usuario/UsuarioPage";
import UsuarioForm from "./pages/Usuario/UsuarioForm";
import LoginPage from "./pages/Login/LoginPage";
import Forbidden from "./pages/Login/Forbidden";
import ProtectedRoute from "./auth/ProtectedRoutes";
import Home from "./pages/Home/Home";
import RenderSearchPage from "./pages/Search/Search";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ProfilePage from "./pages/Profile/ProfilePage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* públicas */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/search/:search" element={<RenderSearchPage />} />

        {/* protegidas */}
        <Route
          element={
            <ProtectedRoute
              allowedGroups={[
                UserGroup.ADMINISTRADOR,
                UserGroup.BIBLIOTECARIO,
              ]}
            >
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          

          <Route path="/pessoas" element={<PessoaPage />} />
          <Route path="/nova-pessoa" element={<PessoaForm />} />
          <Route path="/editar-pessoa/:id" element={<PessoaForm />} />

          <Route path="/departamentos" element={<DepartamentoPage />} />
          <Route path="/novo-departamento" element={<DepartamentoForm />} />
          <Route path="/editar-departamento/:id" element={<DepartamentoForm />} />

          <Route path="/cursos" element={<CursoPage />} />
          <Route path="/novo-curso" element={<CursoForm />} />
          <Route path="/editar-curso/:id" element={<CursoForm />} />

          <Route path="/palavras-chave" element={<PalavraChavePage />} />
          <Route path="/nova-palavra-chave" element={<PalavraChaveForm />} />
          <Route path="/editar-palavra-chave/:id" element={<PalavraChaveForm />} />

          <Route path="/trabalhos" element={<TrabalhoPage />} />
          <Route path="/novo-trabalho" element={<TrabalhoForm />} />
          <Route path="/editar-trabalho/:id" element={<TrabalhoForm />} />

          <Route path="/participacoes-trabalho" element={<ParticipacaoTrabalhoPage />} />
          <Route path="/nova-participacao" element={<ParticipacaoTrabalhoForm />} />
          <Route path="/editar-participacao/:id" element={<ParticipacaoTrabalhoForm />} />

          {/* 🔐 somente administrador */}
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute allowedGroups={[UserGroup.ADMINISTRADOR]}>
                <UsuarioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/novo-usuario"
            element={
              <ProtectedRoute allowedGroups={[UserGroup.ADMINISTRADOR]}>
                <UsuarioForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editar-usuario/:id"
            element={
              <ProtectedRoute allowedGroups={[UserGroup.ADMINISTRADOR]}>
                <UsuarioForm />
              </ProtectedRoute>
            }
          />

          <Route path="/arquivos" element={<ArquivoPage />} />
          <Route path="/novo-arquivo" element={<ArquivoForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
