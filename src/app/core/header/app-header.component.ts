import {Component, HostListener, OnInit, ViewChild, ChangeDetectorRef, Inject} from '@angular/core';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ApplicationService} from '../../services/application/application.service';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {MatAccordion} from '@angular/material/expansion';
import {DOCUMENT} from '@angular/common';
import Typewriter from 't-writer.js'
import {ImageLockedModalComponent} from "../../pages/publisher-page/image-locked-modal/image-locked-modal.component";
import {LogoutModalComponent} from "./logout-modal/logout-modal.component";
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss',
    '../../../assets/animations/animate.css'
  ],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        maxHeight: '500px'
      })),
      state('closed', style({
        maxHeight: 0
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
    trigger('showHideOpacity', [
      // ...
      state('show', style({
        transformOrigin: '200px 200px',
        opacity: 1,
        transform: 'scale(1)',
      })),
      state('hide', style({
        transformOrigin: '200px 200px',
        opacity: 0,
        transform: 'scale(0.8)',
      })),
      transition('show => hide', [
        animate('0.2s cubic-bezier(.4, 0, .2, 1)')
      ]),
      transition('hide => show', [
        animate('0.3s 0.2s cubic-bezier(.4, 0, .2, 1)')
      ]),
    ]),
    trigger('openCloseReports', [
      // ...
      state('open', style({
        transformOrigin: 'left top',
        // opacity: 1,
        transform: 'scaleY(1)',

        borderBottom: '1px solid #BBBCBC',
        // borderTop: '1px solid #BBBCBC'
      })),
      state('closed', style({
        transformOrigin: 'left top',
        // opacity: 0,
        transform: 'scaleY(0)',
      })),
      transition('open => closed', [
        animate('0.3s cubic-bezier(.4, 0, .2, 1)')
      ]),
      transition('closed => open', [
        animate('0.5s cubic-bezier(.4, 0, .2, 1)')
      ]),
    ]),
  ]
})

export class AppHeaderComponent implements OnInit {
  @ViewChild(MatSidenav) drawer: MatSidenav;
  @ViewChild(HTMLElement) MobileToolbar: HTMLElement;

  expandAllLobs = true;
  closeAllLobs = true;
  dashboardMenuOpened = false;
  subMenuOpened = false;
  dashboardSearchOpened = false;
  dashboardNotificationsOpened = false;
  language = 'EN';
  dashboardSearchResult = [
    {
      des: 'Overall 2021 And Three-year Guidance Both Largely As Expected',
      icon: '',
      analyst: 'Cosmous',
      state: 'Published'
    },
    {
      des: 'Overall 2021 And Three-year Guidance Both Largely As Expected',
      icon: '',
      analyst: 'Cosmous',
      state: 'Published'
    },
    {
      des: 'Overall 2021 And Three-year Guidance Both Largely As Expected',
      icon: '',
      analyst: 'Cosmous',
      state: 'Published'
    },
  ];

  dashboardMenus1 = [
    {
      name: 'Main',
      icon: 'lnr lnr-magnifier',
      tabUrl: '/',
      tabName: 'Create a blog post'
    },
    {name: 'Year on Year', icon: 'lnr lnr-mic', tabUrl: '/dash7', tabName: 'Create a blog post'},
    {
      name: 'IE Financials',
      icon: 'lnr lnr-film-play',
      tabUrl: '/dash3',
      tabName: 'Create a Video'
    },
    {
      name: 'IE Details', icon: 'lnr lnr-highlight',
      tabUrl: '/dash7', tabName: 'Create a Podcast'
    },
    {
      name: 'Top 25 Clients',
      icon: 'lnr lnr-users',
      tabUrl: '/top-clients',
      tabName: 'Create a Podcast'
    },
    {
      name: 'Account Transfer',
      icon: 'lnr lnr-users',
      tabUrl: '/account-transfers',
      tabName: 'Create a Podcast'
    },
    {
      name: 'CSAT Esclations', icon: 'lnr lnr-users',
      tabUrl: '/escalation-numbers', tabName: 'Create a Podcast'
    },
    {
      name: 'CSAT Breakdown',
      icon: 'lnr lnr-users',
      tabUrl: '/csat-escalations',
      tabName: 'Create a Podcast'
    },
    {name: 'Email', icon: 'lnr lnr-users', tabUrl: '/dash5', tabName: 'Create a Podcast'},
    {name: 'Chat Breakdown', icon: 'lnr lnr-users', tabUrl: '/dash1', tabName: 'Create a Podcast'}
  ];
  dashboardMenus2 = [
    {
      name: 'Weekly/Monthly/Yearly',
      icon: 'lnr lnr-envelope',
      tabUrl: 'Email_Notifications',
      tabName: 'Email Notifications'
    }, {name: 'Running Rep', icon: 'lnr lnr-line-spacing', tabUrl: '', tabName: ''}, {
      name: 'Rep Category',
      icon: 'lnr lnr-line-spacing',
      tabUrl: '',
      tabName: ''
    }, {name: 'Market', icon: 'lnr lnr-line-spacing', tabUrl: '', tabName: ''}, {
      name: 'Rep Market',
      icon: 'lnr lnr-line-spacing',
      tabUrl: '',
      tabName: ''
    }
  ];
  dashboardMenus3 = [
    {
      name: 'Weekly/Monthly/Yearly',
      icon: 'lnr lnr-envelope',
      tabUrl: 'Email_Notifications',
      tabName: 'Email Notifications'
    }, {name: 'Source', icon: 'lnr lnr-line-spacing', tabUrl: '', tabName: ''}, {
      name: 'Rep Monthly',
      icon: 'lnr lnr-line-spacing',
      tabUrl: '',
      tabName: ''
    }, {name: 'Rep Yearly', icon: 'lnr lnr-line-spacing', tabUrl: '', tabName: ''}];
  dashboardMenus4 = [
    {
      name: 'Data View',
      icon: 'lnr lnr-envelope',
      tabUrl: 'Email_Notifications',
      tabName: 'Email Notifications'
    }, {name: 'Closed', icon: 'lnr lnr-line-spacing', tabUrl: '', tabName: ''}, {
      name: 'Closed YoY',
      icon: 'lnr lnr-line-spacing',
      tabUrl: '',
      tabName: ''
    }, {name: 'Closed Breakdown', icon: 'lnr lnr-line-spacing', tabUrl: '', tabName: ''}, {
      name: '% Under Year',
      icon: 'lnr lnr-line-spacing',
      tabUrl: '',
      tabName: ''
    }, {name: '% Under Year YoY', icon: 'lnr lnr-line-spacing', tabUrl: '', tabName: ''}
  ];
  dashboardMenus5 = [
    {
      name: 'Manage Users',
      icon: 'lnr lnr-envelope',
      tabUrl: 'Email_Notifications',
      tabName: 'Email Notifications'
    }, {name: 'Manage Roles', icon: 'lnr lnr-line-spacing', tabUrl: '', tabName: ''}, {
      name: 'Dashboard Usage Report',
      icon: 'lnr lnr-line-spacing',
      tabUrl: '',
      tabName: ''
    }, {name: 'Data Sources', icon: 'lnr lnr-line-spacing', tabUrl: '', tabName: ''}, {
      name: 'Configurations',
      icon: 'lnr lnr-line-spacing',
      tabUrl: '',
      tabName: ''
    }, {name: 'Schedules', icon: 'lnr lnr-line-spacing', tabUrl: '', tabName: ''}, {
      name: 'Monitoring',
      icon: 'lnr lnr-line-spacing',
      tabUrl: '',
      tabName: ''
    }
  ];
  dashboardMenus6 = [
    {name: 'Help', icon: 'lnr lnr-envelope', tabUrl: 'Email_Notifications', tabName: 'Email Notifications'}
  ];
  dashboardMenus: any = [];
  isLightMode = true;
  isAppOffline = false;
  isLoginPage = false;
  cookieSaved = false;
  europianInvestorNotificationSaved = false;
  doNotShowAgainEuropianInvestorNotification = false;
  toggleSideNav = false;
  // showSubmenu = false;
  // showSubmenu2 = false;
  lastOpenedSubmenu = {};
  toggleDropdown = false;
  headerMenuOpened = false;
  reportMenuOpened = false;
  isFireFox = false;
  isHandset$: MediaQueryList;
  isLoggedIn = false;
  showUserMenu = false;
  showScrollToTop = false;
  mobileSearchText = '';
  searchText = '';
  searchInputFocused = false;
  hideSearch = false;
  dialogRef: any;
  insightSearchText = '';

  menuLinks = [];
  isProfileContainerOpened = false;

  profileOptions = [
    {
      name: 'View Profile',
      icon: 'person',
      route: '/view-profile'
    },
    {
      name: 'Sign Out',
      icon: 'logout',
      route: '/login'
    },
  ];

  searchResult = {
    companies: [
      {
        title: 'Alexion Pharmaceuticals (ALXN-NSDQ)',
        titleUrl: '/company-profile',
        dateInfo: '',
        designation: '',
        imgUrl: ''
      },
      {
        title: ' Energy Resources Australia (ERA-ASX)',
        titleUrl: '/company-profile',
        dateInfo: '',
        designation: '',
        imgUrl: ''
      },
      {
        title: ' Denison Mines (DML-TSX) ',
        titleUrl: '/company-profile',
        dateInfo: '',
        designation: '',
        imgUrl: ''
      }
    ],
    industries: [
      {
        title: 'Biotechnology',
        titleUrl: '/company-profile',
        dateInfo: '',
        designation: '',
        imgUrl: ''
      },
      {
        title: 'Economics',
        titleUrl: '/company-profile',
        dateInfo: '',
        designation: '',
        imgUrl: ''
      },
      {
        title: 'Global Metals & Mining',
        titleUrl: '/company-profile',
        dateInfo: '',
        designation: '',
        imgUrl: ''
      },
    ],
    searches: [
      {
        title: 'Portola Acquisition Takes Alexion Further Beyond C5',
        titleUrl: '/search',
        dateInfo: '05/05/2020 -(ALXN-NSDQ)',
        designation: '',
        imgUrl: ''
      },
      {
        title: 'IPR Settlement a Positive for Alexion',
        titleUrl: '/search',
        dateInfo: '05/31/2020 - (ALXN-NSDQ)',
        designation: '',
        imgUrl: ''
      },
      {
        title: 'Stealth/Alexion Option Agreement Looks to Be a Positive for Both Sides',
        titleUrl: '/search',
        dateInfo: '10/10/2019',
        designation: '',
        imgUrl: ''
      },
      {
        title: 'Alexion Steps into Development Race for COVID-19 Therapeutics',
        titleUrl: '/search',
        dateInfo: '04/20/2020',
        designation: '',
        imgUrl: ''
      },
    ],
    analysts: [
      {
        title: 'Bruice Alex',
        titleUrl: '/analyst-profile',
        dateInfo: '',
        designation: 'Analyst',
        imgUrl: '/assets/images/images_1.jpg'
      },
      {
        title: 'Peter Alex',
        titleUrl: '/analyst-profile',
        dateInfo: '',
        designation: 'Analyst',
        imgUrl: '/assets/images/images_1.jpg'
      },
    ],
  };

  userActivity;
  userInactive: Subject<any> = new Subject();
  isFullScreen = false;
  elem: any;
  userName = '';

  private mobileQueryListener: () => void;

  constructor(public router: Router, private route: ActivatedRoute,
              private authService: MsalService,
              private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog,
              @Inject(DOCUMENT) private document: any,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private applicationService: ApplicationService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((data) => {
      //@ts-ignore
      if (data.url === '/login') {
        this.applicationService.setLoggedIn(false);
        this.dashboardMenuOpened = false;
        this.applicationService.setPinnedMenuOpen(this.dashboardMenuOpened);
      }
      window.scroll(0, 0);
      this.headerMenuOpened = false;
      this.reportMenuOpened = false;
      this.setIsLogin();
      this.closeUserSearch();
      this.closeMobileUserSearch();
      this.toggleSubmenu(false, this.lastOpenedSubmenu);

      this.hideSearch = this.router.url === '/reset-password';
    });

    this.dashboardMenus = [
      {name: 'Executive Dashboards', group: [...this.dashboardMenus1]}, {
        name: 'DI Dashboards',
        group: [...this.dashboardMenus2]
      }, {name: 'Premimum Edge Dashboards', group: [...this.dashboardMenus3]}, {
        name: 'Other Dashboards',
        group: [...this.dashboardMenus4]
      }, {name: 'Administration', group: [...this.dashboardMenus5]}, {name: 'Help', group: [...this.dashboardMenus6]},
    ];

    this.applicationService.getPinnedMenuOpen().subscribe(isOpen => {
      this.dashboardMenuOpened = isOpen;
    });

    this.applicationService.getLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {
        if (window.innerWidth > 850) {
          //this.opendashboardMenu();
        }

        this.userName = this.authService.instance.getAllAccounts()[0]?.name as string;

        const target = document.querySelector('.text1')
        const target2 = document.querySelector('.text2')
        target.innerHTML = '';
        target2.innerHTML = '';

        const options = {
          cursorColor: 'white',
          typeColor: 'white'
        }

        const writer = new Typewriter(target, options)
        const writer2 = new Typewriter(target2, options)
        writer
          .type('THE V-CUT')
          .rest(800)
          .start()
        writer.removeCursor();

        setTimeout(() => {
          writer2
            .type('Salon & Spa')
            .rest(1000)
            .start()
          writer2.removeCursor();
        }, 500)
      }

      this.setIsLogin();
    });

    this.applicationService.getOpenLogInTool().subscribe(isOpen => {
      this.toggleDrawer();
    });

    this.applicationService.getSearchText().subscribe(searchText => {
      if (window.innerWidth > 992) {
        this.searchText = searchText;
      } else {
        this.mobileSearchText = searchText;
      }
    });

    this.setIsLogin();
    this.isHandset$ = media.matchMedia('(max-width: 992px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.isHandset$.addListener(this.mobileQueryListener);
  }

  setIsLogin(): void {
    this.isLoginPage = this.router.url === '/login'
      || (!this.isLoggedIn && this.router.url === '/');
  }

  profileOptionMenuClick(route) {
    if (route === '/login') {
      const dialogRef = this.dialog.open(LogoutModalComponent, {
        width: '500px',
        data: {}
      });
      /*this.applicationService.setLoggedIn(false);
      this.opendashboardMenu();*/

      return;
    }
    this.router.navigateByUrl(route);
  }

  goToLightMode($event) {
    $event.stopPropagation();
    this.isLightMode = true;

    this.applicationService.setDarkMode(this.isLightMode);
  }

  goToDarkMode($event) {
    $event.stopPropagation();
    this.isLightMode = false;

    this.applicationService.setDarkMode(this.isLightMode);
  }

  onLogout() {

  }

  ngOnInit(): void {
    this.elem = document.documentElement;

    // this.searchInsight();
    window.scroll(0, 0);

    if (!navigator.onLine) {
      this.isAppOffline = true;
    }
    addEventListener('offline', (e) => {
      this.isAppOffline = true;
    });
    addEventListener('online', (e) => {
      setTimeout(() => {
        this.isAppOffline = false;
      }, 5500);
    });

    /*setTimeout(() => {
        this.lobAccordion.openAll();
    }, 100);*/


    if (/Android/.test(navigator.appVersion)) {
      /*window.addEventListener('resize', () => {
          if (document.activeElement.tagName === 'INPUT') {
              window.setTimeout(() => {
                  document.activeElement['scrollIntoViewIfNeeded']();
              }, 0);
          }
      });*/
    }

    /*if (this.getBrowserName().indexOf('firefox') >= 0) {
        this.isFireFox = true;
    }*/

    /*setTimeout(() => {
        this.cookieSaved = false;
    }, 2000);*/
  }

  getBrowserName(): void {
    return navigator['sayswho'] = (function () {
      var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge?)\/(\d+)/);
        if (tem != null) {
          return tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg ', 'Edge ');
        }
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
      }
      return M.join(' ');
    })();
  }

  toggleMobileDropdown(): void {
    this.toggleDropdown = !this.toggleDropdown;
  }

  toggleUserMenu(toggle): void {
    this.showUserMenu = toggle;
  }

  userMenuClick($event, path): void {
    $event.stopPropagation();
    $event.preventDefault();

    this.toggleUserMenu(false);
    this.router.navigateByUrl(path);
  }

  signOut($event): void {
    $event.stopPropagation();
    $event.preventDefault();

    this.toggleUserMenu(false);
    this.applicationService.setLoggedIn(false);
    this.router.navigateByUrl('/prelogin');
  }

  toggleSubmenu(toggle, menuLink, $event?): void {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.lastOpenedSubmenu = menuLink;
    menuLink.showSubmenu = toggle;
  }

  toggleProfileOptions($event?): void {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.isProfileContainerOpened = !this.isProfileContainerOpened;
  }

  clickedOutOfUserProfile() {
    this.isProfileContainerOpened = false;
  }

  closeUserSearch(event?): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.searchText = '';
    this.searchInputFocused = false;
  }

  onSearchInputFocus(event?): void {
    event.stopPropagation();
    event.preventDefault();

    this.searchInputFocused = true;
  }

  closeMobileUserSearch(event?): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.mobileSearchText = '';
  }

  navigateAndCloseMobileDrawer(url, event?): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.mobileSearchText = '';
    this.router.navigateByUrl(url);
    this.toggleDrawer();
  }

  onSubmenuClick(menuLink, e): void {
    e.preventDefault();
    e.stopPropagation();
    this.router.navigateByUrl(menuLink.url);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if (this.router.url === '/dash') {
      this.applicationService.setBackButtonClickedFromDashPage(true);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e): void {
    /*if (window.pageYOffset > 120) {
        const element = document.getElementById('sticky-header');
        element.classList.add('sticky');
        document.getElementById('menu-row').classList.add('header-sticked');
    } else {
        const element = document.getElementById('sticky-header');
        element.classList.remove('sticky');
        document.getElementById('menu-row').classList.remove('header-sticked');
    }

    if (window.pageYOffset > 600) {
        const element = document.getElementById('scroll-to-top-container');
        element.classList.add('view-me');
    } else {
        const element = document.getElementById('scroll-to-top-container');
        element.classList.remove('view-me');
    }*/
  }

  scrollToTop(): void {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  goToMainContent(id): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
      el.focus();
    } else {
      window.scrollTo({top: 160, left: 0, behavior: 'smooth'});
    }
  }

  /*eventSubscription = Observable['fromEvent'](window, "scroll").subscribe(e => {
    this.onWindowScroll(e);
  });*/

  toggleMobileSubmenu(menuLink?, $event?, url?, isToggleDrawer?): void {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    if (isToggleDrawer) {
      this.toggleDrawer();
    }

    if (url) {
      this.router.navigateByUrl(url);
    }
  }

  toggleDrawer(): void {
    /*e.preventDefault();
    e.stopPropagation();*/

    this.drawer.toggle();
    this.toggleSideNav = !this.toggleSideNav;
  }

  onCookieSaved(): void {
    this.cookieSaved = true;
  }

  onEuropianInvestorNotificationSaved(): void {
    this.europianInvestorNotificationSaved = true;
  }

  onDoNotShowAgainEuropianInvestorNotification(): void {
    this.doNotShowAgainEuropianInvestorNotification = !this.doNotShowAgainEuropianInvestorNotification;
  }

  openHeaderMenu(e): void {
    e.preventDefault();
    e.stopPropagation();

    this.headerMenuOpened = !this.headerMenuOpened;
  }

  onReportClick(e): void {
    e.preventDefault();
    e.stopPropagation();

    this.reportMenuOpened = !this.reportMenuOpened;
  }

  clickedOutSearch(e): void {
    if (this.headerMenuOpened) {
      this.headerMenuOpened = false;
      // this.MobileToolbar.focus();
    }
  }

  isMegaMenuRequired(menu): boolean {
    let totalSubmenus = 0;
    menu.subMenuCols.map(subMenuCol => {
      totalSubmenus += subMenuCol.subMenus.length;
    });
    return menu.subMenuCols.length > 1 || totalSubmenus > 1;
  }

  opendashboardMenu(event?): void {
    if (event) event.stopPropagation();

    this.dashboardMenuOpened = !this.dashboardMenuOpened;
    this.applicationService.setPinnedMenuOpen(this.dashboardMenuOpened);
  }

  clickedOutOfdashboardMenu(): void {
    /*event.stopPropagation();
    event.preventDefault();*/

    this.dashboardMenuOpened = false;
  }

  opendashboardSearch(event): void {
    event.stopPropagation();

    this.dashboardSearchOpened = !this.dashboardSearchOpened;
  }

  clickedOutOfdashboardSearch(event): void {
    /*event.stopPropagation();
    event.preventDefault();*/

    this.dashboardSearchOpened = false;
  }

  clickMainMenuLink(url): void {
    this.clickedOutOfdashboardMenu();
    this.router.navigateByUrl(url);
  }


}
