import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function GridBoxTest(){
    return(
        <>
            <Grid container direction='column'>
                <Grid item xs={12} container>
                    <Grid item xs={2}>
                        Welcome, Vignesh
                    </Grid>
                    <Grid xs={8}/>
                    <Grid xs={2}>
                        Logout
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={6}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, officia aspernatur! Quod dolorem totam temporibus, quis modi nisi. Excepturi, tempore ipsa laudantium corporis aperiam nam! Id velit porro quaerat incidunt.
                    </Grid>
                    <Grid item xs={6}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus numquam vitae amet eius nesciunt necessitatibus laboriosam nihil nam blanditiis asperiores repudiandae hic labore, reiciendis consectetur odio ea perferendis impedit vero?
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}