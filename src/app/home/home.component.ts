import { Component, OnInit, TemplateRef } from '@angular/core';

import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

import { AppService } from '../app.service';
import { ModalDeleteTaskComponent } from '../modals/modal-delete-task/modal-delete-task.component';
import { Task } from '../classes/Task';
import { StringUtil } from '../utils/StringUtil'
import { DateUtil } from '../utils/DateUtil';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch;
  faFilter = faFilter;

  bsModalRef?: BsModalRef | null;

  searchBy: string;
  limit: number;
  limitRange: number[] = [];

  totalTasks: number;
  currentPage: number;
  hasFilters: boolean;

  tasks: Task[] = [];

  constructor(private appService: AppService, private toastr: ToastrService, private modalService: BsModalService) { }

  async ngOnInit(): Promise<void> {
    this.searchBy    = '';
    this.limit       = 5;
    this.limitRange  = Array(20).fill(0).map((_, i) => i+1);
    this.currentPage = 1;

    this.totalTasks = await this.getTotalTasks();
    
    this.hasFilters = false;

    this.searchTasks();
  }

  searchTasks() {  
    const queryParams = this.filtersToQueryParams();

    this.appService.getTasks(queryParams).then(
      async (success: Task[]) => {
        this.tasks = [... success];
      },
      error => {
        this.toastr.error('Atualize a página e tente novamente.', 'Algo de errado aconteceu.');
        console.log(error);
      }
    )
  }

  openAddNewTaskModal() {
    console.log('openAddNewTaskModal');
  }

  openUpdateTaskModal() {
    console.log('openUpdateTaskModal');
  }

  openDeleteTaskModal(task: Task) {
    console.log('openDeleteTaskModal');
    // this.modalRef = this.modalService.show(template);
    const initialState: ModalOptions  = {
      initialState: {
        task: task
      },
      class: 'modal-sm'
    };
    this.bsModalRef = this.modalService.show(ModalDeleteTaskComponent, initialState);

    if (this.bsModalRef.onHide) {
        this.bsModalRef.onHide.subscribe(event => {
          // console.log(event);
          this.searchTasks();
        })
    }
  }

  updatePayed(task: Task) {
    task.isPayed = !task.isPayed;
    this.appService.updateTask(task);
  }

  formatDate(date: string) {
    const options: any = {
      dateStyle: "medium"
    }

    return DateUtil.stringDateToLocaleString(date, options);
  } 

  formatHour(date: string) {
    const locale = 'pt-br';
    const options: any = {
      timeZone: 'Etc/Universal', // para manter as 3 horas do utc no New Date
      hour12: true,
      hour: '2-digit',
      minute:'2-digit'

    }

    const [_, time, meridiem] = new Date(date).toLocaleDateString(locale, options).split(' ')
    
    return time + ' ' + meridiem;
  }

  formatValue(value: number) {
    return StringUtil.formatValue(value);
  }

  private async getTotalTasks() {
    let totalTasks = 500; // número alto para garantir que tem todas

    await this.appService.getTasks().then(
      (success: Task[]) => {
        totalTasks = success.length;
      },
      error => {
        this.toastr.error('Atualize a página e tente novamente.', 'Algo de errado aconteceu.');
        console.log(error);
      }
    )
    return totalTasks;
  }

  private filtersToQueryParams() {
    let queryParams = '?_page=' + this.currentPage + '&_limit=' + this.limit;
    this.hasFilters = false;

    if (this.searchBy.length > 0) {
      queryParams = '?name_like=' + this.searchBy.trim(); // quando busca pelo nome não utiliza paginação
      this.hasFilters = true;
    }

    return queryParams;
  }

}
