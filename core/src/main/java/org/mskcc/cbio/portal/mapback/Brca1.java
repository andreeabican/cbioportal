/*
 * Copyright (c) 2015 Memorial Sloan-Kettering Cancer Center.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS
 * FOR A PARTICULAR PURPOSE. The software and documentation provided hereunder
 * is on an "as is" basis, and Memorial Sloan-Kettering Cancer Center has no
 * obligations to provide maintenance, support, updates, enhancements or
 * modifications. In no event shall Memorial Sloan-Kettering Cancer Center be
 * liable to any party for direct, indirect, special, incidental or
 * consequential damages, including lost profits, arising out of the use of this
 * software and its documentation, even if Memorial Sloan-Kettering Cancer
 * Center has been advised of the possibility of such damage.
 */

/*
 * This file is part of cBioPortal.
 *
 * cBioPortal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

package org.mskcc.cbio.portal.mapback;

import java.util.ArrayList;

/**
 * Encapsulates information regarding GenBank Record:  U14680 for BRCA1.
 *
 * http://www.ncbi.nlm.nih.gov/nuccore/555931?report=genbank
 *
 */
public class Brca1 extends MapBackGene {
    private final ArrayList <Mapping> mappingList;
    private final String dna;

    public Brca1() {
        //  Mapping List is Derived from UCSC Table Browser
        mappingList = new ArrayList <Mapping>();
        mappingList.add(new Mapping(1	,38451221, 124));
        mappingList.add(new Mapping(125	,38453185, 61));
        mappingList.add(new Mapping(186	,38454663, 74));
        mappingList.add(new Mapping(260	,38456605, 55));
        mappingList.add(new Mapping(315	,38462594, 84));
        mappingList.add(new Mapping(399	,38468875, 41));
        mappingList.add(new Mapping(440	,38469416, 78));
        mappingList.add(new Mapping(518	,38473150, 88));
        mappingList.add(new Mapping(606	,38476470, 311));
        mappingList.add(new Mapping(917	,38479873, 191));
        mappingList.add(new Mapping(1108	,38482030, 127));
        mappingList.add(new Mapping(1235	,38487946, 172));
        mappingList.add(new Mapping(1407	,38496486, 89));
        mappingList.add(new Mapping(1496	,38496977, 3426));
        mappingList.add(new Mapping(4922	,38501388, 77));
        mappingList.add(new Mapping(4999	,38502786, 46));
        mappingList.add(new Mapping(5045	,38505317, 106));
        mappingList.add(new Mapping(5151	,38509664, 140));
        mappingList.add(new Mapping(5291	,38510410, 89));
        mappingList.add(new Mapping(5380	,38511998, 78));
        mappingList.add(new Mapping(5458	,38521268, 54));
        mappingList.add(new Mapping(5512	,38529559, 99));
        mappingList.add(new Mapping(5611	,38530813, 71));
        mappingList.add(new Mapping(5689	,38530890, 22));

        dna = "AGCTCGCTGAGACTTCCTGGACCCCGCACCAGGCTGTGGGGTTTCTCAGATAACTGGGCCCCTGCGCTCA" +
                "GGAGGCCTTCACCCTCTGCTCTGGGTAAAGTTCATTGGAACAGAAAGAAATGGATTTATCTGCTCTTCGC" +
                "GTTGAAGAAGTACAAAATGTCATTAATGCTATGCAGAAAATCTTAGAGTGTCCCATCTGTCTGGAGTTGA" +
                "TCAAGGAACCTGTCTCCACAAAGTGTGACCACATATTTTGCAAATTTTGCATGCTGAAACTTCTCAACCA" +
                "GAAGAAAGGGCCTTCACAGTGTCCTTTATGTAAGAATGATATAACCAAAAGGAGCCTACAAGAAAGTACG" +
                "AGATTTAGTCAACTTGTTGAAGAGCTATTGAAAATCATTTGTGCTTTTCAGCTTGACACAGGTTTGGAGT" +
                "ATGCAAACAGCTATAATTTTGCAAAAAAGGAAAATAACTCTCCTGAACATCTAAAAGATGAAGTTTCTAT" +
                "CATCCAAAGTATGGGCTACAGAAACCGTGCCAAAAGACTTCTACAGAGTGAACCCGAAAATCCTTCCTTG" +
                "CAGGAAACCAGTCTCAGTGTCCAACTCTCTAACCTTGGAACTGTGAGAACTCTGAGGACAAAGCAGCGGA" +
                "TACAACCTCAAAAGACGTCTGTCTACATTGAATTGGGATCTGATTCTTCTGAAGATACCGTTAATAAGGC" +
                "AACTTATTGCAGTGTGGGAGATCAAGAATTGTTACAAATCACCCCTCAAGGAACCAGGGATGAAATCAGT" +
                "TTGGATTCTGCAAAAAAGGCTGCTTGTGAATTTTCTGAGACGGATGTAACAAATACTGAACATCATCAAC" +
                "CCAGTAATAATGATTTGAACACCACTGAGAAGCGTGCAGCTGAGAGGCATCCAGAAAAGTATCAGGGTAG" +
                "TTCTGTTTCAAACTTGCATGTGGAGCCATGTGGCACAAATACTCATGCCAGCTCATTACAGCATGAGAAC" +
                "AGCAGTTTATTACTCACTAAAGACAGAATGAATGTAGAAAAGGCTGAATTCTGTAATAAAAGCAAACAGC" +
                "CTGGCTTAGCAAGGAGCCAACATAACAGATGGGCTGGAAGTAAGGAAACATGTAATGATAGGCGGACTCC" +
                "CAGCACAGAAAAAAAGGTAGATCTGAATGCTGATCCCCTGTGTGAGAGAAAAGAATGGAATAAGCAGAAA" +
                "CTGCCATGCTCAGAGAATCCTAGAGATACTGAAGATGTTCCTTGGATAACACTAAATAGCAGCATTCAGA" +
                "AAGTTAATGAGTGGTTTTCCAGAAGTGATGAACTGTTAGGTTCTGATGACTCACATGATGGGGAGTCTGA" +
                "ATCAAATGCCAAAGTAGCTGATGTATTGGACGTTCTAAATGAGGTAGATGAATATTCTGGTTCTTCAGAG" +
                "AAAATAGACTTACTGGCCAGTGATCCTCATGAGGCTTTAATATGTAAAAGTGAAAGAGTTCACTCCAAAT" +
                "CAGTAGAGAGTAATATTGAAGACAAAATATTTGGGAAAACCTATCGGAAGAAGGCAAGCCTCCCCAACTT" +
                "AAGCCATGTAACTGAAAATCTAATTATAGGAGCATTTGTTACTGAGCCACAGATAATACAAGAGCGTCCC" +
                "CTCACAAATAAATTAAAGCGTAAAAGGAGACCTACATCAGGCCTTCATCCTGAGGATTTTATCAAGAAAG" +
                "CAGATTTGGCAGTTCAAAAGACTCCTGAAATGATAAATCAGGGAACTAACCAAACGGAGCAGAATGGTCA" +
                "AGTGATGAATATTACTAATAGTGGTCATGAGAATAAAACAAAAGGTGATTCTATTCAGAATGAGAAAAAT" +
                "CCTAACCCAATAGAATCACTCGAAAAAGAATCTGCTTTCAAAACGAAAGCTGAACCTATAAGCAGCAGTA" +
                "TAAGCAATATGGAACTCGAATTAAATATCCACAATTCAAAAGCACCTAAAAAGAATAGGCTGAGGAGGAA" +
                "GTCTTCTACCAGGCATATTCATGCGCTTGAACTAGTAGTCAGTAGAAATCTAAGCCCACCTAATTGTACT" +
                "GAATTGCAAATTGATAGTTGTTCTAGCAGTGAAGAGATAAAGAAAAAAAAGTACAACCAAATGCCAGTCA" +
                "GGCACAGCAGAAACCTACAACTCATGGAAGGTAAAGAACCTGCAACTGGAGCCAAGAAGAGTAACAAGCC" +
                "AAATGAACAGACAAGTAAAAGACATGACAGCGATACTTTCCCAGAGCTGAAGTTAACAAATGCACCTGGT" +
                "TCTTTTACTAAGTGTTCAAATACCAGTGAACTTAAAGAATTTGTCAATCCTAGCCTTCCAAGAGAAGAAA" +
                "AAGAAGAGAAACTAGAAACAGTTAAAGTGTCTAATAATGCTGAAGACCCCAAAGATCTCATGTTAAGTGG" +
                "AGAAAGGGTTTTGCAAACTGAAAGATCTGTAGAGAGTAGCAGTATTTCATTGGTACCTGGTACTGATTAT" +
                "GGCACTCAGGAAAGTATCTCGTTACTGGAAGTTAGCACTCTAGGGAAGGCAAAAACAGAACCAAATAAAT" +
                "GTGTGAGTCAGTGTGCAGCATTTGAAAACCCCAAGGGACTAATTCATGGTTGTTCCAAAGATAATAGAAA" +
                "TGACACAGAAGGCTTTAAGTATCCATTGGGACATGAAGTTAACCACAGTCGGGAAACAAGCATAGAAATG" +
                "GAAGAAAGTGAACTTGATGCTCAGTATTTGCAGAATACATTCAAGGTTTCAAAGCGCCAGTCATTTGCTC" +
                "CGTTTTCAAATCCAGGAAATGCAGAAGAGGAATGTGCAACATTCTCTGCCCACTCTGGGTCCTTAAAGAA" +
                "ACAAAGTCCAAAAGTCACTTTTGAATGTGAACAAAAGGAAGAAAATCAAGGAAAGAATGAGTCTAATATC" +
                "AAGCCTGTACAGACAGTTAATATCACTGCAGGCTTTCCTGTGGTTGGTCAGAAAGATAAGCCAGTTGATA" +
                "ATGCCAAATGTAGTATCAAAGGAGGCTCTAGGTTTTGTCTATCATCTCAGTTCAGAGGCAACGAAACTGG" +
                "ACTCATTACTCCAAATAAACATGGACTTTTACAAAACCCATATCGTATACCACCACTTTTTCCCATCAAG" +
                "TCATTTGTTAAAACTAAATGTAAGAAAAATCTGCTAGAGGAAAACTTTGAGGAACATTCAATGTCACCTG" +
                "AAAGAGAAATGGGAAATGAGAACATTCCAAGTACAGTGAGCACAATTAGCCGTAATAACATTAGAGAAAA" +
                "TGTTTTTAAAGAAGCCAGCTCAAGCAATATTAATGAAGTAGGTTCCAGTACTAATGAAGTGGGCTCCAGT" +
                "ATTAATGAAATAGGTTCCAGTGATGAAAACATTCAAGCAGAACTAGGTAGAAACAGAGGGCCAAAATTGA" +
                "ATGCTATGCTTAGATTAGGGGTTTTGCAACCTGAGGTCTATAAACAAAGTCTTCCTGGAAGTAATTGTAA" +
                "GCATCCTGAAATAAAAAAGCAAGAATATGAAGAAGTAGTTCAGACTGTTAATACAGATTTCTCTCCATAT" +
                "CTGATTTCAGATAACTTAGAACAGCCTATGGGAAGTAGTCATGCATCTCAGGTTTGTTCTGAGACACCTG" +
                "ATGACCTGTTAGATGATGGTGAAATAAAGGAAGATACTAGTTTTGCTGAAAATGACATTAAGGAAAGTTC" +
                "TGCTGTTTTTAGCAAAAGCGTCCAGAAAGGAGAGCTTAGCAGGAGTCCTAGCCCTTTCACCCATACACAT" +
                "TTGGCTCAGGGTTACCGAAGAGGGGCCAAGAAATTAGAGTCCTCAGAAGAGAACTTATCTAGTGAGGATG" +
                "AAGAGCTTCCCTGCTTCCAACACTTGTTATTTGGTAAAGTAAACAATATACCTTCTCAGTCTACTAGGCA" +
                "TAGCACCGTTGCTACCGAGTGTCTGTCTAAGAACACAGAGGAGAATTTATTATCATTGAAGAATAGCTTA" +
                "AATGACTGCAGTAACCAGGTAATATTGGCAAAGGCATCTCAGGAACATCACCTTAGTGAGGAAACAAAAT" +
                "GTTCTGCTAGCTTGTTTTCTTCACAGTGCAGTGAATTGGAAGACTTGACTGCAAATACAAACACCCAGGA" +
                "TCCTTTCTTGATTGGTTCTTCCAAACAAATGAGGCATCAGTCTGAAAGCCAGGGAGTTGGTCTGAGTGAC" +
                "AAGGAATTGGTTTCAGATGATGAAGAAAGAGGAACGGGCTTGGAAGAAAATAATCAAGAAGAGCAAAGCA" +
                "TGGATTCAAACTTAGGTGAAGCAGCATCTGGGTGTGAGAGTGAAACAAGCGTCTCTGAAGACTGCTCAGG" +
                "GCTATCCTCTCAGAGTGACATTTTAACCACTCAGCAGAGGGATACCATGCAACATAACCTGATAAAGCTC" +
                "CAGCAGGAAATGGCTGAACTAGAAGCTGTGTTAGAACAGCATGGGAGCCAGCCTTCTAACAGCTACCCTT" +
                "CCATCATAAGTGACTCTTCTGCCCTTGAGGACCTGCGAAATCCAGAACAAAGCACATCAGAAAAAGCAGT" +
                "ATTAACTTCACAGAAAAGTAGTGAATACCCTATAAGCCAGAATCCAGAAGGCCTTTCTGCTGACAAGTTT" +
                "GAGGTGTCTGCAGATAGTTCTACCAGTAAAAATAAAGAACCAGGAGTGGAAAGGTCATCCCCTTCTAAAT" +
                "GCCCATCATTAGATGATAGGTGGTACATGCACAGTTGCTCTGGGAGTCTTCAGAATAGAAACTACCCATC" +
                "TCAAGAGGAGCTCATTAAGGTTGTTGATGTGGAGGAGCAACAGCTGGAAGAGTCTGGGCCACACGATTTG" +
                "ACGGAAACATCTTACTTGCCAAGGCAAGATCTAGAGGGAACCCCTTACCTGGAATCTGGAATCAGCCTCT" +
                "TCTCTGATGACCCTGAATCTGATCCTTCTGAAGACAGAGCCCCAGAGTCAGCTCGTGTTGGCAACATACC" +
                "ATCTTCAACCTCTGCATTGAAAGTTCCCCAATTGAAAGTTGCAGAATCTGCCCAGAGTCCAGCTGCTGCT" +
                "CATACTACTGATACTGCTGGGTATAATGCAATGGAAGAAAGTGTGAGCAGGGAGAAGCCAGAATTGACAG" +
                "CTTCAACAGAAAGGGTCAACAAAAGAATGTCCATGGTGGTGTCTGGCCTGACCCCAGAAGAATTTATGCT" +
                "CGTGTACAAGTTTGCCAGAAAACACCACATCACTTTAACTAATCTAATTACTGAAGAGACTACTCATGTT" +
                "GTTATGAAAACAGATGCTGAGTTTGTGTGTGAACGGACACTGAAATATTTTCTAGGAATTGCGGGAGGAA" +
                "AATGGGTAGTTAGCTATTTCTGGGTGACCCAGTCTATTAAAGAAAGAAAAATGCTGAATGAGCATGATTT" +
                "TGAAGTCAGAGGAGATGTGGTCAATGGAAGAAACCACCAAGGTCCAAAGCGAGCAAGAGAATCCCAGGAC" +
                "AGAAAGATCTTCAGGGGGCTAGAAATCTGTTGCTATGGGCCCTTCACCAACATGCCCACAGATCAACTGG" +
                "AATGGATGGTACAGCTGTGTGGTGCTTCTGTGGTGAAGGAGCTTTCATCATTCACCCTTGGCACAGGTGT" +
                "CCACCCAATTGTGGTTGTGCAGCCAGATGCCTGGACAGAGGACAATGGCTTCCATGCAATTGGGCAGATG" +
                "TGTGAGGCACCTGTGGTGACCCGAGAGTGGGTGTTGGACAGTGTAGCACTCTACCAGTGCCAGGAGCTGG" +
                "ACACCTACCTGATACCCCAGATCCCCCACAGCCACTACTGA";
    }

    public ArrayList<Mapping> getMappingList() {
        return mappingList;
    }

    public String getFullDna() {
        return dna;
    }

    public boolean isForwardStrand() {
        return false;
    }
}