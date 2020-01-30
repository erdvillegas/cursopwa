import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../services/paises.service';
import { PaisInterface } from 'src/app/interfaces/paises.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  pais: PaisInterface;

  constructor(
    public paisesService: PaisesService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.paisesService.getPaisPorId(id).then(pais => {
      if (!pais) {
        return this.router.navigateByUrl('/');
      }
      this.pais = pais;
      console.log(pais);
    });
  }

}
