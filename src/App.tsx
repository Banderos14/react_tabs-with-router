import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import './App.scss';
import { Tab } from './types/Tab';
import { Tabs, TabList, Tab as ReactTab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const tabs: Tab[] = [
  { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
  { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
  { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
];

const HomePage = () => (
  <div className="section">
    <div className="container">
      <h1 className="title">Home page</h1>
    </div>
  </div>
);

const TabsPage = () => {
  const { tabId } = useParams<'tabId'>();
  const selectedIndex = tabs.findIndex(tab => tab.id === tabId);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Tabs page</h1>

        <div className="tabs is-boxed">
          <Tabs selectedIndex={selectedIndex >= 0 ? selectedIndex : 0}>
            <TabList>
              {tabs.map(tab => (
                <ReactTab
                  key={tab.id}
                  data-cy="Tab"
                  selectedClassName={selectedIndex >= 0 ? 'is-active' : undefined}
                >
                  <Link to={`/tabs/${tab.id}`}>{tab.title}</Link>
                </ReactTab>
              ))}
            </TabList>
          </Tabs>
        </div>

        <div className="block" data-cy="TabContent">
          {selectedIndex >= 0 ? tabs[selectedIndex].content : 'Please select a tab'}
        </div>
      </div>
    </div>
  );
};

const NotFoundPage = () => (
  <div className="section">
    <div className="container">
      <h1 className="title">Page not found</h1>
    </div>
  </div>
);

const AppNav = () => {
  const { pathname } = useLocation();
  const isHomeActive = pathname === '/';
  const isTabsActive = pathname === '/tabs' || pathname.startsWith('/tabs/');

  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="Nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            className={`navbar-item${isHomeActive ? ' is-active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/tabs"
            className={`navbar-item${isTabsActive ? ' is-active' : ''}`}
          >
            Tabs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export const App = () => (
  <>
    <AppNav />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate replace to="/" />} />
      <Route path="/tabs">
        <Route index element={<TabsPage />} />
        <Route path=":tabId" element={<TabsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);
