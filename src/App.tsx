import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AppShell,
  Button,
  createTheme,
  MantineProvider,
  Select,
  Tabs,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { store } from "./store";
import { lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
const Login = lazy(() => import("./pages/Login.page"));
const Signup = lazy(() => import("./pages/Signup.page"));
const Dashboard = lazy(() => import("./pages/Dashboard.page"));
const Projects = lazy(() => import("./pages/Projects.page"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.page"));
const Tasks = lazy(() => import("./pages/Tasks.page"));
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css"; 
import "@mantine/dates/styles.css";
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});
export const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "#F1F7FE",
      "#E8F1FD",
      "#D1E3FA",
      "#A2C6F6",
      "#74AAF1",
      "#468EEC",
      "#1A73E8",
      "#135BB9",
      "#0E448B",
      "#092D5D",
      "#05172E",
      "#020B17",
    ],
  },
  fontFamily: "Public Sans, sans-serif",
  components: {
    Button: Button.extend({
      defaultProps: {
        fw: 400,
        size: "md",
        radius: "xl",
        variant: "filled",
        style: { fontSize: 14, fontWeight: 500, borderRadius: 8 },
      },
    }),
    AppShell: AppShell.Main.extend({
      defaultProps: {
        bg: "white",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: "md",
      },
      styles: {
        label: {
          marginBottom: 6,
        },
      },
    }),
    NumberInput: TextInput.extend({
      styles: {
        label: {
          marginBottom: 6,
        },
      },
    }),
    Select: Select.extend({
      defaultProps: {
        allowDeselect: false,
        checkIconPosition: "right",
        comboboxProps: {
          shadow: "var(--mantine-shadow-sm)",
        },
        searchable: true,
        nothingFoundMessage: "No data found",
      },
      styles: {
        label: {
          marginBottom: 6,
        },
      },
    }),
    Textarea: Textarea.extend({
      styles: {
        label: {
          marginBottom: 6,
        },
      },
    }),

    Tabs: Tabs.extend({
      classNames: {
        tab: "task-manger-tab",
      },
    }),
  },
});
 
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <Notifications position="top-right" />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes grouped under ProtectedLayout */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-tasks" element={<Tasks/>} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
              </Route>

              {/* Default redirects */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
